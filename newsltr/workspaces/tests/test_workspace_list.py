from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse

from authorization.tests.common import TEST_DATA as TEST_USER_DATA
from authorization.tests.common import create_user, login_user
from authorization.tests.mixins import UserTestCaseMixin
from workspaces.models import Workspace
from workspaces.tests.common import create_workspace


class WorkspaceListViewTest(
    UserTestCaseMixin,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        self.user = create_user()
        self.base_url = reverse("workspace-list")

    def test_get_workspaces_without_authorization(self):
        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_get_workspaces_with_authorization(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertFalse(response.data["results"])

        workspace, _ = create_workspace(user=self.user)
        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["name"], workspace.name)
        self.assertEqual(
            response.data["results"][0]["description"], workspace.description
        )
        self.assert_instance_exists(Workspace, pk=workspace.pk)

    def test_get_workspaces_with_authorization_and_multiple_workspaces(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        workspace1, _ = create_workspace(user=self.user)
        workspace2, _ = create_workspace(name="Test Workspace 2", user=self.user)
        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 2)
        self.assertEqual(response.data["results"][0]["name"], workspace1.name)
        self.assertEqual(
            response.data["results"][0]["description"], workspace1.description
        )
        self.assertEqual(response.data["results"][1]["name"], workspace2.name)
        self.assertEqual(
            response.data["results"][1]["description"], workspace2.description
        )
        self.assert_instance_exists(Workspace, pk=workspace1.pk)
        self.assert_instance_exists(Workspace, pk=workspace2.pk)
