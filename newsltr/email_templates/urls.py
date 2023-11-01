from django.urls import path

from .views import EmailTemplatesListView, EmailTemplatesCreateView

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
]
