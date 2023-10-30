import stripe
from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA as TEST_USER_DATA
from authorization.tests.common import login_user
from payments.tests.mixins import WithSubscriptionTestMixin
from workspaces.models import Workspace
from workspaces.tests.common import TEST_DATA


class WorkspaceCreateViewTest(
    WithSubscriptionTestMixin,
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("workspace-list")

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

        self.provider.create_customer_with_subscription(self.user)

        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_201_CREATED)
        self.assertTrue(Workspace.objects.exists())
        # create another workspace = this should fail because of plan limit
        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
