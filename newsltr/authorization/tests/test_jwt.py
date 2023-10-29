from django.contrib.auth import get_user_model
from django.test import TestCase
from djoser.social.token.jwt import TokenStrategy
from rest_framework_simplejwt.serializers import TokenVerifySerializer

from authorization.tests.common import TEST_DATA, create_user

User = get_user_model()


class JWTStrategyTestCase(TestCase):
    def test_obtain_provides_valid_token_for_given_user(self):
        user = create_user(**TEST_DATA)

        res = TokenStrategy.obtain(user)
        self.assertEqual(res["user"], user)

        data = {"token": res["access"]}
        serializer = TokenVerifySerializer(data=data)
        self.assertTrue(serializer.is_valid())
