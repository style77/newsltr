from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse

from authorization.tests.common import TEST_DATA as TEST_USER_DATA
from authorization.tests.common import create_user, login_user
from workspaces.models import Workspace

from .common import invite_user_to_workspace
from .mixins import WorkspaceTestCaseMixin


class WorkspaceDeleteViewTest(
    WorkspaceTestCaseMixin,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("workspace-detail", args=(self.workspace.pk,))

    def test_delete_workspace_without_authorization(self):
        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_delete_workspace_with_authorization(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_204_NO_CONTENT)
        self.assert_instance_does_not_exist(Workspace, pk=self.workspace.pk)

    def test_delete_workspace_with_authorization_as_not_owner(self):
        user = create_user(email="test2@test.com")
        invite_user_to_workspace(user, self.workspace, role="member")
        login_user(self.client, user.email, TEST_USER_DATA["password"])

        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
        self.assert_instance_exists(Workspace, pk=self.workspace.pk)
