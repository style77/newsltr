from djet import assertions
from djoser import signals
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from authorization.tests.common import TEST_DATA, create_user, login_user
from .mixins import SuperUserAndUserTestCaseMixin, UserTestCaseMixin


class UserViewSetListTest(
    SuperUserAndUserTestCaseMixin, assertions.StatusCodeAssertionsMixin
):
    def setUp(self):
        super().setUp()
        self.base_url = reverse("user-detail", args=[self.user.pk])

    def test_unauthenticated_user_cannot_get_user_detail(self):
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_401_UNAUTHORIZED)

    def test_user_can_get_own_details(self):
        login_user(self.client, self.user.email, TEST_DATA["password"])
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_200_OK)

    def test_user_cannot_get_other_user_detail(self):
        another_user = create_user(
            **{
                "first_name": "Paul",
                "last_name": "Thomson",
                "password": "Password123",
                "email": "asdf@asd.com",
            }
        )
        login_user(self.client, self.user.email, TEST_DATA["password"])
        response = self.client.get(reverse("user-detail", args=[another_user.pk]))

        self.assert_status_equal(response, status.HTTP_404_NOT_FOUND)

    def test_superuser_can_get_other_user_detail(self):
        login_user(self.client, self.superuser.email, "Superuser123")
        response = self.client.get(self.base_url)

        self.assert_status_equal(response, status.HTTP_200_OK)


class UserViewSetEditTest(UserTestCaseMixin, assertions.StatusCodeAssertionsMixin):
    def setUp(self):
        super().setUp()
        self.signal_sent = False
        self.base_url = reverse("user-detail", args=[self.user.pk])

    def signal_receiver(self, *args, **kwargs):
        self.signal_sent = True

    def test_patch_edits_user_attribute(self):
        signals.user_updated.connect(self.signal_receiver)
        login_user(self.client, self.user.email, TEST_DATA["password"])
        response = self.client.patch(
            path=self.base_url,
            data={"first_name": "Test2"},
        )

        self.assert_status_equal(response, status.HTTP_200_OK)
        self.assertTrue("first_name" in response.data)

        self.user.refresh_from_db()
        self.assertTrue(self.signal_sent)
        self.assertTrue(self.user.first_name == "Test2")

    def test_patch_cant_edit_others_attribute(self):
        another_user = create_user(
            **{
                "first_name": "Paul",
                "last_name": "Thomson",
                "password": "Password123",
                "email": "paul@beatles.com",
            }
        )
        login_user(self.client, self.user.email, TEST_DATA["password"])
        response = self.client.patch(
            path=reverse("user-detail", args=[another_user.pk]),
            data={"email": "new@gmail.com"},
        )

        self.assert_status_equal(response, status.HTTP_404_NOT_FOUND)

        another_user.refresh_from_db()
        self.assertTrue(another_user.email == "paul@beatles.com")

    def test_put_edits_user_attribute(self):
        login_user(self.client, self.user.email, TEST_DATA["password"])

        response = self.client.patch(
            path=self.base_url,
            data={"password": "NewPassword123"},
        )

        self.assert_status_equal(response, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertTrue(self.user.email == TEST_DATA["email"])

    def test_put_cant_edit_others_attribute(self):
        another_user_data = {
            "first_name": "Paul",
            "last_name": "Thomson",
            "password": "secret",
            "email": "paul@beatles.com",
        }
        another_user = create_user(**another_user_data)
        another_user_data["password"] = "changed_secret"
        login_user(self.client, self.user.email, TEST_DATA["password"])

        response = self.client.patch(
            path=reverse("user-detail", args=[another_user.pk]), data=another_user_data
        )

        self.assert_status_equal(response, status.HTTP_404_NOT_FOUND)

        another_user.refresh_from_db()
        self.assertTrue(another_user.email == "paul@beatles.com")
