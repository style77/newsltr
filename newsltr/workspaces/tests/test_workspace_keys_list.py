import stripe
from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse

from authorization.tests.common import TEST_DATA as TEST_USER_DATA
from authorization.tests.common import login_user
from payments.tests.common import (create_subscription,
                                   get_or_create_stripe_customer)
from workspaces.tests.common import (create_user,
                                     invite_user_to_workspace)
from .mixins import WorkspaceTestCaseMixin


class WorkspaceKeysListViewTest(
    WorkspaceTestCaseMixin,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("workspace-keys-list", args=(self.workspace.pk,))
        self.created_customers = []

    def tearDown(self):
        for customer in self.created_customers:
            stripe.Customer.delete(customer.customer_id)
        return super().tearDown()

    def test_list_workspace_keys_without_authorization(self):
        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_list_workspace_keys_with_authorization_without_subscription(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)

    def test_list_workspace_keys_with_authorization_with_subscription(self):
        login_user(self.client, self.user.email, TEST_USER_DATA["password"])
        stripe_user = get_or_create_stripe_customer(self.user)
        self.created_customers.append(stripe_user)
        create_subscription(stripe_user)

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_workspace_keys_with_authorization_as_member(self):
        member = create_user(email="test2@test.com")
        invite_user_to_workspace(member, self.workspace, role="member")
        login_user(self.client, member.email, TEST_USER_DATA["password"])

        response = self.client.get(self.base_url)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
