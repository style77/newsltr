from django.urls import reverse
from rest_framework.test import APITestCase

from email_templates.models import EmailTemplate
from email_templates.tests.common import setup_tests_data


class TestEmailTemplatesListView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        setup_tests_data(cls)
        cls.url = reverse(
            "list_email_templates", kwargs={"campaign_id": cls.campaign.id}
        )

    def test_get_unauthorized_list(self):
        req = self.client.get(self.url)
        self.assertEqual(req.status_code, 401)

    def test_get_nonexistent_list(self):
        nonexistent_url = reverse(
            "list_email_templates",
            kwargs={"campaign_id": "00000000-0000-0000-0000-000000000000"},
        )

        req = self.client.get(
            nonexistent_url, headers={"Authorization": f"Bearer {self.jwt}"}
        )
        self.assertEqual(req.status_code, 404)

    def test_get_list_of_emails(self):
        template = EmailTemplate.objects.create(
            subject="test_subject",
            content="test_content",
            extra_data={"tracking_data": {}},
            campaign_id=self.campaign.id,
        )

        req = self.client.get(self.url, headers={"Authorization": f"Bearer {self.jwt}"})

        expected_res = {
            "count": 1,
            "next": None,
            "previous": None,
            "results": [
                {
                    "id": template.id,
                    "subject": "test_subject",
                    "content": "test_content",
                    "extra_data": {"tracking_data": {}},
                    "last_sent_at": template.last_sent_at.strftime(
                        "%Y-%m-%dT%H:%M:%S.%fZ"
                    ),
                },
            ],
        }

        self.assertEqual(req.status_code, 200)
        self.assertDictEqual(req.json(), expected_res)
