from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .common import setup_test_data_of_create_list_views


class CreateSubscriberCreateListViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        setup_test_data_of_create_list_views(cls)

        cls.url = reverse("create_subscriber", kwargs={"campaign_id": cls.campaign.id})

        cls.req_data = {
            "email": "newsltr@example.com",
            "tracking_data": {"ip": "127.420.69.1"},
        }

        cls.expected_resp = {
            "email": "newsltr@example.com",
            "tracking_data": {"ip": "127.420.69.1"},
            "joined_at": "2023-10-28T19:11:04.869Z",
        }

    def test_create_subscriber_unauthorized(self):
        req = self.client.post(self.url)
        self.assertEqual(req.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_subscriber_with_api_key(self):
        req = self.client.post(
            self.url,
            data=self.req_data,
            headers={"X-API-KEY": self.api_key},
            format="json",
        )

        self.assertEqual(req.status_code, status.HTTP_201_CREATED)

        res = req.json()
        self.assertTrue(res["email"], self.req_data["email"])
        self.assertDictEqual(res["tracking_data"], self.req_data["tracking_data"])

    def test_create_subscriber_with_bearer_token(self):
        req = self.client.post(
            self.url,
            data=self.req_data,
            headers={"Authorization": f"Bearer {self.jwt}"},
            format="json",
        )

        self.assertEqual(req.status_code, status.HTTP_201_CREATED)

        res = req.json()
        self.assertTrue(res["email"], self.req_data["email"])
        self.assertDictEqual(res["tracking_data"], self.req_data["tracking_data"])
