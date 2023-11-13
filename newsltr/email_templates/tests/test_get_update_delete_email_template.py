from django.urls import reverse
from rest_framework.test import APITestCase

from ..models import EmailTemplate
from .common import deserialize_datetime, setup_tests_data


class TestGetUpdateDeleteEmailTemplateView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        setup_tests_data(cls)

        cls.unchangeable_template = EmailTemplate.objects.create(
            campaign=cls.campaign,
            subject="test_template_subject",
            content="test_template_content",
            extra_data={"tracking_data": {}},
        )

        cls.get_url = reverse(
            "retrieve_update_delete_template",
            kwargs={
                "campaign_id": str(cls.campaign.id),
                "template_id": str(cls.unchangeable_template.id),
            },
        )

    def setUp(self):
        self.template = EmailTemplate.objects.create(
            subject="test_template_subject",
            content="test_content",
            extra_data={"some_data": True},
            campaign_id=self.campaign.id,
        )

        self.editable_url = reverse(
            "retrieve_update_delete_template",
            kwargs={
                "campaign_id": str(self.campaign.id),
                "template_id": str(self.template.id),
            },
        )

    def test_get_template_unauthorized(self):
        req = self.client.get(self.get_url)

        self.assertEqual(req.status_code, 401)

    def test_request_nonexistent_template(self):
        nonexistent_url = reverse(
            "retrieve_update_delete_template",
            kwargs={
                "campaign_id": "00000000-0000-0000-0000-000000000000",
                "template_id": "00000000-0000-0000-0000-000000000000",
            },
        )

        req = self.client.get(
            nonexistent_url, headers={"Authorization": f"Bearer {self.jwt}"}
        )

        self.assertEqual(req.status_code, 404)

    def test_get_template(self):
        req = self.client.get(
            self.get_url, headers={"Authorization": f"Bearer {self.jwt}"}
        )

        expected_res = {
            "id": str(self.unchangeable_template.id),
            "subject": self.unchangeable_template.subject,
            "content": self.unchangeable_template.content,
            "extra_data": self.unchangeable_template.extra_data,
            "last_sent_at": deserialize_datetime(
                self.unchangeable_template.last_sent_at
            ),
        }

        self.assertEqual(req.status_code, 200)
        self.assertDictEqual(req.json(), expected_res)

    def test_patch_template(self):
        new_data = {
            "subject": "new_subject",
            "content": "new content, yay!",
            "extra_data": {"should_change": True},
        }
        req = self.client.patch(
            self.editable_url,
            data=new_data,
            headers={"Authorization": f"Bearer {self.jwt}"},
            format="json",
        )

        expected_res = {
            "id": str(self.template.id),
            "subject": "new_subject",
            "content": "new content, yay!",
            "extra_data": {"should_change": True},
            "last_sent_at": deserialize_datetime(self.template.last_sent_at),
        }

        self.assertEqual(req.status_code, 200)
        self.assertDictEqual(req.json(), expected_res)

    def test_delete_template(self):
        req = self.client.delete(
            self.editable_url, headers={"Authorization": f"Bearer {self.jwt}"}
        )

        self.assertEqual(req.status_code, 204)
        with self.assertRaises(EmailTemplate.DoesNotExist):
            EmailTemplate.objects.get(pk=self.template.id)
