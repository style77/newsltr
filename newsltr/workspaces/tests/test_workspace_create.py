import stripe
from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA as TEST_USER_DATA
from authorization.tests.common import create_user, login_user
from authorization.tests.mixins import UserTestCaseMixin
from payments.tests.common import (create_subscription,
                                   get_or_create_stripe_customer)
from workspaces.models import Workspace
from workspaces.tests.common import TEST_DATA


class WorkspaceCreateViewTest(
    UserTestCaseMixin,
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("workspace-list")
        self.created_customers = []

    def tearDown(self):
        for customer in self.created_customers:
            stripe.Customer.delete(customer.customer_id)
        return super().tearDown()

    def test_post_create_workspace_without_authorization(self):
        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(Workspace.objects.exists())

    def test_post_create_workspace_with_authorization_no_subscription(self):
        login_user(self.client, TEST_USER_DATA["email"], TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)

    def test_post_create_workspace_with_authorization_with_subscription(self):
        login_user(self.client, TEST_USER_DATA["email"], TEST_USER_DATA["password"])

        stripe_user = get_or_create_stripe_customer(self.user)
        self.created_customers.append(stripe_user)
        create_subscription(stripe_user)

        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_201_CREATED)
        self.assertTrue(Workspace.objects.exists())
        # create another workspace = this should fail because of plan limit
        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
