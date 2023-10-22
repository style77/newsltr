from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from djet import assertions

from workspaces.models import Workspace, WorkspaceAPIKey
from workspaces.tests.common import create_workspace, create_user, invite_user_to_workspace

from authorization.tests.common import (
    TEST_DATA as TEST_USER_DATA,
    login_user,
)


class WorkspaceKeysDeleteViewTest(
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        self.workspace, self.user = create_workspace()
        self.key, _ = WorkspaceAPIKey.objects.create(workspace=self.workspace, name="Test Key")
        self.base_url = reverse("workspace-keys-detail", args=(self.workspace.pk, self.key.pk,))

    def test_delete_workspace_key_without_authorization(self):
        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_delete_workspace_key_with_authorization_as_admin(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_204_NO_CONTENT)
        self.assert_instance_exists(WorkspaceAPIKey, pk=self.key.pk)
        self.assertTrue(WorkspaceAPIKey.objects.get(pk=self.key.pk).revoked)

    def test_delete_workspace_key_with_authorization_as_member(self):
        member = create_user(email="test2@test.com")
        invite_user_to_workspace(member, self.workspace, role="member")
        login_user(self.client, member.email, TEST_USER_DATA["password"])

        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
        self.assert_instance_exists(WorkspaceAPIKey, pk=self.key.pk)
        self.assertFalse(self.key.revoked)
