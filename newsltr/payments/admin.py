from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import StripeUser


class PaymentsAdmin(ModelAdmin):
    ...


admin.site.register(StripeUser, PaymentsAdmin)
