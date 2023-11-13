from django.urls import path

from .views import (EmailTemplatesCreateView,
                    EmailTemplatesGetUpdateDeleteView, EmailTemplatesListView)

urlpatterns = [
    path(
        "<uuid:campaign_id>/",
        EmailTemplatesListView.as_view(),
        name="list_email_templates",
    ),
    path(
        "<uuid:campaign_id>/templates/",
        EmailTemplatesCreateView.as_view(),
        name="create_email_template",
    ),
    path(
        "<uuid:campaign_id>/templates/<uuid:template_id>/",
        EmailTemplatesGetUpdateDeleteView.as_view(),
        name="retrieve_update_delete_template",
    ),
]
