from django.urls import reverse
from rest_framework.test import APITestCase

from email_templates.tests.common import setup_tests_data


class TestCreateEmailTemplateView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        setup_tests_data(cls)
        cls.url = reverse(
            "create_email_template", kwargs={"campaign_id": cls.campaign.id}
        )

    def test_create_template_unauthorized(self):
        req = self.client.post(self.url)
        self.assertEqual(req.status_code, 401)

    def test_create_template(self):
        data = {
            "subject": "test_subject",
            "content": "test_content",
            "extra_data": {"tracking_test_data": {}},
        }

        expected_res = {
            **data,
        }

        req = self.client.post(
            self.url,
            data=data,
            headers={"Authorization": f"Bearer {self.jwt}"},
            format="json",
        )

        self.assertEqual(req.status_code, 201)

        res = req.json()

        self.assertTrue(res.get("last_sent_at"))
        self.assertTrue(res.get("id"))
        res.pop("last_sent_at")
        res.pop("id")

        self.assertDictEqual(res, expected_res)
