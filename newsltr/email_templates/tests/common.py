from rest_framework_simplejwt.tokens import AccessToken

from authorization.models import User
from workspaces.models import Workspace, WorkspaceMembership


def setup_tests_data(cls) -> None:
    workspace = Workspace.objects.create(
        name="List view workspace", description="Created to listview test"
    )

    user = User.objects.create(email="newsltr_test@example.com")
    WorkspaceMembership.objects.create(workspace=workspace, user=user, role="member")

    cls.campaign = workspace.campaign
    cls.jwt = AccessToken.for_user(user)
