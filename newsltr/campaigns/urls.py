from django.urls import path

from .views import (CampaignUserCreateView, CampaignUserListView,
                    CampaignUserRetrieveUpdateDeleteView)

urlpatterns = [
    path(
        "<uuid:campaign_id>/subscribers/",
        CampaignUserListView.as_view(),
        name="list_subscribers",
    ),
    path(
        "<uuid:campaign_id>/subscribers/user/",
        CampaignUserCreateView.as_view(),
        name="create_subscriber",
    ),
    path(
        "<uuid:campaign_id>/subscribers/user/<uuid:user_id>/",
        CampaignUserRetrieveUpdateDeleteView.as_view(),
        name="retrieve_update_delete_subscriber",
    ),
]
