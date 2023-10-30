import djoser.signals
import djoser.utils
import djoser.views
from django.contrib.auth.tokens import default_token_generator
from djet import assertions
from djoser.conf import settings as default_settings
from rest_framework import status
from rest_framework.reverse import reverse

from .mixins import UserTestCaseMixin


class ActivationViewTest(
    UserTestCaseMixin, assertions.EmailAssertionsMixin, assertions.StatusCodeAssertionsMixin
):
    def setUp(self):
        self.base_url = reverse("user-activation")
        self.signal_sent = False
        super().setUp()

    def signal_receiver(self, *args, **kwargs):
        self.signal_sent = True

    def test_post_activate_user_and_not_login(self):
        self.user.is_active = False
        self.user.save()
        data = {
            "uid": djoser.utils.encode_uid(self.user.pk),
            "token": default_token_generator.make_token(self.user),
        }

        response = self.client.post(self.base_url, data)
        self.user.refresh_from_db()

        self.assert_status_equal(response, status.HTTP_204_NO_CONTENT)
        self.assertTrue(self.user.is_active)

    def test_post_respond_with_bad_request_when_wrong_uid(self):
        data = {"uid": "wrong-uid", "token": default_token_generator.make_token(self.user)}

        response = self.client.post(self.base_url, data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(list(response.data.keys()), ["uid"])
        self.assertEqual(
            response.data["uid"],
            [default_settings.CONSTANTS.messages.INVALID_UID_ERROR],
        )

    def test_post_respond_with_bad_request_when_stale_token(self):
        djoser.signals.user_activated.connect(self.signal_receiver)
        data = {
            "uid": djoser.utils.encode_uid(self.user.pk),
            "token": default_token_generator.make_token(self.user),
        }

        response = self.client.post(self.base_url, data)

        self.assert_status_equal(response, status.HTTP_403_FORBIDDEN)
        self.assertEqual(list(response.data.keys()), ["detail"])
        self.assertEqual(
            response.data["detail"],
            default_settings.CONSTANTS.messages.STALE_TOKEN_ERROR,
        )
        self.assertFalse(self.signal_sent)

    def test_post_respond_with_bad_request_when_wrong_token(self):
        djoser.signals.user_activated.connect(self.signal_receiver)
        data = {"uid": djoser.utils.encode_uid(self.user.pk), "token": "wrong-token"}

        response = self.client.post(self.base_url, data)

        self.assert_status_equal(response, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(list(response.data.keys()), ["token"])
        self.assertEqual(
            response.data["token"],
            [default_settings.CONSTANTS.messages.INVALID_TOKEN_ERROR],
        )
        self.assertFalse(self.signal_sent)
