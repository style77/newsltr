from django.contrib import admin
from unfold.admin import ModelAdmin

from email_templates.models import EmailTemplate


class EmailTemplatesAdmin(ModelAdmin):
    ...


admin.site.register(EmailTemplate, EmailTemplatesAdmin)
