import stripe
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from djet import assertions
from payments.tests.common import create_subscription, get_or_create_stripe_customer

from workspaces.models import WorkspaceAPIKey
from workspaces.tests.common import (
    create_workspace,
    create_user,
    invite_user_to_workspace,
)

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
        self.key, _ = WorkspaceAPIKey.objects.create(
            workspace=self.workspace, name="Test Key"
        )
        self.base_url = reverse(
            "workspace-keys-detail",
            args=(
                self.workspace.pk,
                self.key.pk,
            ),
        )
        self.created_customers = []

    def tearDown(self):
        for customer in self.created_customers:
            stripe.Customer.delete(customer.customer_id)
        return super().tearDown()

    def test_delete_workspace_key_without_authorization(self):
        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_delete_workspace_key_with_authorization_without_subscription(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.delete(self.base_url)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
        self.assert_instance_exists(WorkspaceAPIKey, pk=self.key.pk)
        self.assertFalse(WorkspaceAPIKey.objects.get(pk=self.key.pk).revoked)

    def test_delete_workspace_key_with_authorization_with_subscription(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])
        stripe_user = get_or_create_stripe_customer(self.user)
        self.created_customers.append(stripe_user)
        create_subscription(stripe_user)

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
        self.assertFalse(WorkspaceAPIKey.objects.get(pk=self.key.pk).revoked)
