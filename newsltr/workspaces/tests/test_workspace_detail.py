from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from djet import assertions

from workspaces.models import Workspace
from workspaces.tests.common import create_workspace

from authorization.tests.common import (
    TEST_DATA as TEST_USER_DATA,
    login_user,
)


class WorkspaceGetViewTest(
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        self.workspace, self.user = create_workspace()
        self.base_url = reverse("workspace-detail", args=(self.workspace.pk,))

    def test_get_workspace_without_authorization(self):
        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_get_workspace_with_authorization(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.workspace.name)
        self.assertEqual(response.data["description"], self.workspace.description)
        self.assert_instance_exists(Workspace, pk=self.workspace.pk)

    def test_get_workspace_with_authorization_and_wrong_workspace_id(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.get(reverse("workspace-detail", args=("1234",)))
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
