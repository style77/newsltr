from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from campaigns.models import CampaignSubscriber
from campaigns.tests.common import set_up_test_data


class TestRetrieveUpdateDeleteSubscriberView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        set_up_test_data(cls)
        cls.test_unauthorized_subscriber = CampaignSubscriber.objects.create(
            email="unauth@example.com",
            tracking_data={"test": "data"},
            campaign=cls.campaign,
        )

        cls.auth_test_url = reverse(
            "retrieve_update_delete_subscriber",
            kwargs={
                "campaign_id": cls.campaign.id,
                "user_id": cls.test_unauthorized_subscriber.id,
            },
        )

    def test_get_404(self):
        bad_url = reverse(
            "retrieve_update_delete_subscriber",
            kwargs={
                "campaign_id": "00000000-0000-0000-0000-000000000000",
                "user_id": "00000000-0000-0000-0000-000000000000",
            },
        )
        req = self.client.post(bad_url)
        self.assertEqual(req.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_update_delete_unautiorized(self):
        res = self.client.get(self.auth_test_url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_update_delete_with_apikey(self):
        res = self.client.get(self.auth_test_url, headers={"X-API-KEY": self.api_key})
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_retrieve_update_delete_with_jwt(self):
        res = self.client.get(
            self.auth_test_url, headers={"Authorization": f"Bearer {self.jwt}"}
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        user = CampaignSubscriber.objects.create(
            email="to_be_deleted@example.com",
            tracking_data={"test": "data"},
            campaign=self.campaign,
        )

        url = reverse(
            "retrieve_update_delete_subscriber",
            kwargs={"campaign_id": self.campaign.id, "user_id": user.id},
        )

        res = self.client.delete(url, headers={"Authorization": f"Bearer {self.jwt}"})

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_patch_user(self):
        user = CampaignSubscriber.objects.create(
            email="before_patch@example.com",
            tracking_data={"test": "data"},
            campaign=self.campaign,
        )

        url = reverse(
            "retrieve_update_delete_subscriber",
            kwargs={"campaign_id": self.campaign.id, "user_id": user.id},
        )

        res = self.client.patch(
            url,
            data={"email": "after_patch@example.com"},
            headers={"Authorization": f"Bearer {self.jwt}"},
            format="json",
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.json()["email"], "after_patch@example.com")
