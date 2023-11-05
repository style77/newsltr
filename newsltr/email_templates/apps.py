from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class EmailTemplatesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "email_templates"
    verbose_name = _("Email templates")
