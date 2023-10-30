from unfold.admin import ModelAdmin

from .models import CampaignSubscriber, Campaign

from django.contrib import admin


class CampaignBaseAdmin(ModelAdmin):
    ...


admin.site.register(CampaignSubscriber, CampaignBaseAdmin)
admin.site.register(Campaign, CampaignBaseAdmin)
