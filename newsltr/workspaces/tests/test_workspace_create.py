from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from djet import assertions
from payments.tests.common import setup_subscription

from workspaces.models import Workspace, WorkspaceMembership
from workspaces.tests.common import TEST_DATA

from authorization.tests.common import (
    TEST_DATA as TEST_USER_DATA,
    create_user,
    login_user,
)


class WorkspaceCreateViewTest(
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
):
    def setUp(self):
        self.base_url = reverse("workspace-list")
        self.user = create_user()

    def test_post_create_workspace_without_authorization(self):
        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(Workspace.objects.exists())

    def test_post_create_workspace_with_authorization_no_subscription(self):
        login_user(self.client, TEST_USER_DATA["email"], TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)

    def test_post_create_workspace_with_authorization_with_subscription(self):
        setup_subscription(self.user)
        login_user(self.client, TEST_USER_DATA["email"], TEST_USER_DATA["password"])

        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_201_CREATED)
        self.assertTrue(Workspace.objects.exists())
