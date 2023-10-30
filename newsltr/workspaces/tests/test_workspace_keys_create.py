import stripe
from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA as TEST_USER_DATA
from authorization.tests.common import login_user
from payments.tests.common import (create_subscription,
                                   get_or_create_stripe_customer)
from workspaces.models import WorkspaceAPIKey
from workspaces.tests.common import create_user, invite_user_to_workspace

from payments.tests.mixins import WithSubscriptionAndWorkspaceTestMixin


class WorkspaceKeysCreateViewTest(
    WithSubscriptionAndWorkspaceTestMixin,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("workspace-keys-list", args=(self.workspace.pk,))

    def test_create_workspace_key_without_authorization(self):
        response = self.client.post(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_create_workspace_key_with_authorization_without_subscription(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, data={"name": "Test Key"})
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
        self.assert_instance_does_not_exist(WorkspaceAPIKey, pk=response.data.get("id"))

    def test_create_workspace_key_with_authorization_with_subscription(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])
        self.provider.create_customer_with_subscription(self.user)

        response = self.client.post(self.base_url, data={"name": "Test Key"})
        self.assert_status_equal(response, status.HTTP_201_CREATED)
        self.assert_instance_exists(WorkspaceAPIKey, pk=response.data.get("id"))

    def test_create_workspace_key_with_authorization_as_member(self):
        member = create_user(email="test2@test.com")
        invite_user_to_workspace(member, self.workspace, role="member")
        login_user(self.client, member.email, TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, data={"name": "Test Key"})
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
