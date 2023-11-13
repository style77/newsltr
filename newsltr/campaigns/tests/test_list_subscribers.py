from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import CampaignSubscriber
from .common import set_up_test_data


class TestListSubscribersView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        set_up_test_data(cls)

        cls.url = reverse("list_subscribers", kwargs={"campaign_id": cls.campaign.id})
        subscriber = CampaignSubscriber.objects.create(
            email="newsltr@example.com",
            tracking_data={"ip": "127.420.69.1"},
            campaign=cls.campaign,
        )

        sub_creation_datetime = subscriber.joined_at.strftime("%Y-%m-%dT%H:%M:%S.%fZ")

        cls.expected_resp = {
            "count": 1,
            "next": None,
            "previous": None,
            "results": [
                {
                    "id": str(subscriber.id),
                    "email": "newsltr@example.com",
                    "tracking_data": {"ip": "127.420.69.1"},
                    "joined_at": sub_creation_datetime,
                },
            ],
        }

    def test_get_404(self):
        bad_url = reverse(
            "list_subscribers",
            kwargs={"campaign_id": "00000000-0000-0000-0000-000000000000"},
        )
        req = self.client.post(bad_url)
        self.assertEqual(req.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_subscribers_list_unauthorized(self):
        req = self.client.get(self.url)
        self.assertEqual(req.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_subscribers_list_with_apikey(self):
        req = self.client.get(self.url, headers={"X-API-KEY": self.api_key})
        self.assertEqual(req.status_code, status.HTTP_200_OK)

        res = req.json()
        self.assertDictEqual(res, self.expected_resp)

    def test_get_subscribers_with_jwt(self):
        req = self.client.get(self.url, headers={"Authorization": f"Bearer {self.jwt}"})
        self.assertEqual(req.status_code, status.HTTP_200_OK)

        res = req.json()
        self.assertDictEqual(res, self.expected_resp)
