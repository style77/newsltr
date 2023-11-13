from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Campaign, CampaignSubscriber


class CampaignBaseAdmin(ModelAdmin):
    ...


admin.site.register(CampaignSubscriber, CampaignBaseAdmin)
admin.site.register(Campaign, CampaignBaseAdmin)
