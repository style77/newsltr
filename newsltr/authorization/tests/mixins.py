from rest_framework.test import APITestCase

from .common import TEST_DATA, create_user, login_user


class UserTestCaseMixin(APITestCase):
    def setUp(self):
        super().setUp()
        self.user = create_user()


class AuthorizedUserTestCaseMixin(UserTestCaseMixin):
    def setUp(self):
        super().setUp()
        login_user(self.client, self.user.email, TEST_DATA["password"])


class SuperUserTestCaseMixin(APITestCase):
    def setUp(self):
        super().setUp()
        self.superuser = create_user(
            first_name="super",
            last_name="user",
            email="superuser@example.com",
            password="Superuser123",
            is_superuser=True,
            is_staff=True,
        )


# Todo fix error with inheriting from both UserTestCaseMixin and SuperUserTestCaseMixin
class SuperUserAndUserTestCaseMixin(SuperUserTestCaseMixin, UserTestCaseMixin):
    def setUp(self):
        super().setUp()
