from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from djet import assertions

from workspaces.models import Workspace
from workspaces.tests.common import (
    create_workspace,
    create_user,
    invite_user_to_workspace,
)

from authorization.tests.common import (
    TEST_DATA as TEST_USER_DATA,
    login_user,
)


class WorkspaceKeysCreateViewTest(
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        self.workspace, self.user = create_workspace()
        self.base_url = reverse("workspace-keys-list", args=(self.workspace.pk,))

    def test_create_workspace_key_without_authorization(self):
        response = self.client.post(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_create_workspace_key_with_authorization_as_admin(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, data={"name": "Test Key"})
        self.assert_status_equal(response, status.HTTP_201_CREATED)
        self.assert_instance_exists(Workspace, pk=self.workspace.pk)
        self.assertEqual(len(response.data["key"]), 40)

    def test_create_workspace_key_with_authorization_as_member(self):
        member = create_user(email="test2@test.com")
        invite_user_to_workspace(member, self.workspace, role="member")
        login_user(self.client, member.email, TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, data={"name": "Test Key"})
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
