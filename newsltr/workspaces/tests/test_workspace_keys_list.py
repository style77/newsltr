from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from djet import assertions

from workspaces.tests.common import (
    create_workspace,
    create_user,
    invite_user_to_workspace,
)

from authorization.tests.common import (
    TEST_DATA as TEST_USER_DATA,
    login_user,
)


class WorkspaceKeysListViewTest(
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        self.workspace, self.user = create_workspace()
        self.base_url = reverse("workspace-keys-list", args=(self.workspace.pk,))

    def test_list_workspace_keys_without_authorization(self):
        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_list_workspace_keys_with_authorization_as_admin(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

    def test_list_workspace_keys_with_authorization_as_member(self):
        member = create_user(email="test2@test.com")
        invite_user_to_workspace(member, self.workspace, role="member")
        login_user(self.client, member.email, TEST_USER_DATA["password"])

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
