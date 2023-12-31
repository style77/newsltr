from rest_framework_simplejwt.tokens import AccessToken

from authorization.models import User
from workspaces.models import Workspace, WorkspaceMembership


def set_up_test_data(cls):
    workspace = Workspace.objects.create(
        name="test_workspace", description="testing subscribers"
    )
    user = User.objects.create(email="newsltr@example.com", password="donoteveruseit")
    WorkspaceMembership.objects.create(user=user, role="admin", workspace=workspace)

    cls.api_key = workspace.keys.first().key
    cls.campaign = workspace.campaign

    cls.jwt = str(AccessToken.for_user(user=user))
