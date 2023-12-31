from django.contrib.auth import get_user_model
from djet import assertions
from djoser.conf import settings as default_settings
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA, create_user, mock, perform_create_mock

User = get_user_model()


class UserCreateViewTest(
    APITestCase,
    assertions.StatusCodeAssertionsMixin,
    assertions.EmailAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("user-list")

    def test_post_create_user_without_login(self):
        data = TEST_DATA.copy()
        data["re_password"] = TEST_DATA["password"]
        response = self.client.post(self.base_url, data)
        self.assert_status_equal(response, status.HTTP_201_CREATED)
        self.assertTrue("password" not in response.data)
        self.assert_instance_exists(User, email=TEST_DATA["email"])

        user = User.objects.get(email=TEST_DATA["email"])
        self.assertTrue(user.check_password(TEST_DATA["password"]))
        self.assert_emails_in_mailbox(1)
        self.assert_email_exists(to=[TEST_DATA["email"]])
        self.assertFalse(user.is_active)

    def test_post_not_create_new_user_if_email_exists(self):
        create_user()
        response = self.client.post(self.base_url, TEST_DATA)
        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)

    def test_post_not_register_if_password_common(self):
        data = {
            "first_name": TEST_DATA["first_name"],
            "last_name": TEST_DATA["last_name"],
            "email": TEST_DATA["email"],
            "password": "12345678",
            "re_password": "12345678",
        }
        response = self.client.post(self.base_url, data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        response.render()
        self.assertEqual(
            str(response.data["password"][0]), "This password is too common."
        )
        self.assertEqual(response.data["password"][0].code, "password_too_common")

    def test_post_not_register_if_password_mismatch(self):
        data = {
            "first_name": TEST_DATA["first_name"],
            "last_name": TEST_DATA["last_name"],
            "email": TEST_DATA["email"],
            "password": "#Secret1234",
            "re_password": "#Wrong1234",
        }
        response = self.client.post(self.base_url, data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        response.render()
        self.assertEqual(
            str(response.data["non_field_errors"][0]),
            default_settings.CONSTANTS.messages.PASSWORD_MISMATCH_ERROR,
        )

    @mock.patch(
        "djoser.serializers.UserCreateSerializer.perform_create",
        side_effect=perform_create_mock,
    )
    def test_post_return_400_for_integrity_error(self, perform_create):
        data = {
            "integrity_error": "true",
            "first_name": TEST_DATA["first_name"],
            "last_name": TEST_DATA["last_name"],
            "email": "john@beatles.com",
            "password": "Secret1234",
            "re_password": "Secret1234",
        }
        response = self.client.post(self.base_url, data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data,
            [default_settings.CONSTANTS.messages.CANNOT_CREATE_USER_ERROR],
        )
