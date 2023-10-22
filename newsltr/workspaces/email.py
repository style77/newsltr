from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage

from djoser import utils
from django.conf import settings


class WorkspaceInvitationEmail(BaseEmailMessage):
    template_name = "email/workspace_invitation.html"

    def get_context_data(self):
        context = super().get_context_data()

        user = context.get("user")
        workspace = context.get("workspace")

        context["uid"] = utils.encode_uid(user.pk)
        context["workspace_id"] = utils.encode_uid(workspace.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.WORKSPACES["ACTIVATION_URL"].format(**context)

        context["workspace_name"] = workspace.name
        return context
