from django.contrib.auth import get_user_model
from djet import assertions
from djoser.views import UserViewSet
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA, create_user, login_user

from .mixins import UserTestCaseMixin

User = get_user_model()


class UserMeDeleteViewTestCase(
    UserTestCaseMixin,
    assertions.StatusCodeAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    viewset = UserViewSet

    def setUp(self):
        super().setUp()
        self.base_url = reverse("user-me")

    def test_delete_user_if_logged_in(self):
        self.assert_instance_exists(User, email=TEST_DATA["email"])
        data = {"current_password": TEST_DATA["password"]}

        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.base_url, data=data)

        self.assert_status_equal(response, status.HTTP_204_NO_CONTENT)
        self.assert_instance_does_not_exist(User, email=TEST_DATA["email"])

    def test_not_delete_if_fails_password_validation(self):
        self.assert_instance_exists(User, email=TEST_DATA["email"])
        data = {"current_password": "incorrect"}

        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.base_url, data=data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"current_password": ["Invalid password."]})


class UserViewSetDeletionTest(
    UserTestCaseMixin,
    assertions.StatusCodeAssertionsMixin,
    assertions.EmailAssertionsMixin,
    assertions.InstanceAssertionsMixin,
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("user-detail", kwargs={User._meta.pk.name: self.user.pk})

    def test_delete_user_if_logged_in(self):
        self.assert_instance_exists(User, email=TEST_DATA["email"])
        data = {"current_password": TEST_DATA["password"]}

        login_user(self.client, self.user.email, TEST_DATA["password"])

        response = self.client.delete(
            self.base_url,
            data=data,
        )

        self.assert_status_equal(response, status.HTTP_204_NO_CONTENT)
        self.assert_instance_does_not_exist(User, email=TEST_DATA["email"])

    def test_not_delete_if_fails_password_validation(self):
        self.assert_instance_exists(User, email=TEST_DATA["email"])
        data = {"current_password": "incorrect"}

        login_user(self.client, self.user.email, TEST_DATA["password"])

        response = self.client.delete(
            self.base_url,
            data=data,
        )

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"current_password": ["Invalid password."]})
