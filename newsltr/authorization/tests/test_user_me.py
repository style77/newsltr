from django.conf import settings
from django.contrib.auth import get_user_model
from django.test import override_settings
from djet import assertions
from rest_framework import serializers, status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA, create_user, login_user

from .mixins import AuthorizedUserTestCaseMixin, UserTestCaseMixin

User = get_user_model()


class UserViewSetMeTest(
    AuthorizedUserTestCaseMixin,
    assertions.EmailAssertionsMixin,
    assertions.InstanceAssertionsMixin,
    assertions.StatusCodeAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("user-me")

    def test_get_return_user(self):
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_200_OK)

        expected_keys = set([User.USERNAME_FIELD, User._meta.pk.name] + User.REQUIRED_FIELDS + ['last_login', 'date_joined'])
        self.assertEqual(set(response.data.keys()), expected_keys)

    def test_patch_email_change(self):
        data = {"email": TEST_DATA["email"]}
        response = self.client.patch(self.base_url, data=data)

        self.assert_status_equal(response, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(data["email"], self.user.email)
        self.assertTrue(self.user.is_active)
        # self.assert_emails_in_mailbox(1)
        # self.assert_email_exists(to=[data["email"]])


class UserViewSetMeDeleteTest(
    UserTestCaseMixin,
    assertions.InstanceAssertionsMixin,
    assertions.StatusCodeAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("user-me")

    def test_delete_user_if_logged_in(self):
        self.assert_instance_exists(User, email=TEST_DATA["email"])
        data = {"current_password": TEST_DATA["password"]}
        login_user(self.client, self.user.email, TEST_DATA["password"])

        response = self.client.delete(self.base_url, data=data)
        self.assert_status_equal(response, status.HTTP_204_NO_CONTENT)
        self.assert_instance_does_not_exist(User, email=TEST_DATA["email"])

    def test_not_delete_if_fails_password_validation(self):
        self.assert_instance_exists(User, email=TEST_DATA["email"])
        data = {"current_password": "incorrect"}
        login_user(self.client, self.user.email, TEST_DATA["password"])

        response = self.client.delete(self.base_url, data=data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"current_password": ["Invalid password."]})
