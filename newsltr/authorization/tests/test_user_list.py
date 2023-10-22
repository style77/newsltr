from djet import assertions
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from authorization.tests.common import create_user, login_user, TEST_DATA


class UserViewSetListTest(APITestCase, assertions.StatusCodeAssertionsMixin):
    def setUp(self):
        self.base_url = reverse("user-list")
        self.user = create_user()
        self.superuser = create_user(
            first_name="Super",
            last_name="User",
            email="superuser@example.com",
            password="Superuser123",
            is_superuser=True,
            is_staff=True,
        )

    def test_unauthenticated_user_cannot_list_users(self):
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_user_cannot_list_other_users(self):
        login_user(self.client, self.user.email, TEST_DATA["password"])
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)

    def test_superuser_can_list_all_users(self):
        login_user(self.client, self.superuser, "Superuser123")
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
