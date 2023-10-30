from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .common import setup_test_data_of_create_list_views
from ..models import CampaignSubscriber


class TestListSubscribersView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        setup_test_data_of_create_list_views(cls)

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
