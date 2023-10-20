from authorization.tests.common import create_user
from workspaces.models import Workspace, WorkspaceMembership

__all__ = [
    "TEST_DATA",
    "create_workspace",
    "create_workspace_membership",
]

TEST_DATA = {
    "name": "Test Workspace",
    "description": "Test Workspace Description",
}


def create_workspace_membership(user, workspace, role="admin"):
    return WorkspaceMembership.objects.create(user=user, workspace=workspace, role=role)


def create_workspace(name=None, description=None, user=None, **kwargs):
    data = {
        "name": name or TEST_DATA["name"],
        "description": description or TEST_DATA["description"],
    }
    data.update(kwargs)

    workspace = Workspace.objects.create(**data)
    admin = create_user() if not user else user
    create_workspace_membership(admin, workspace, role="admin")
    return workspace, admin


def invite_user_to_workspace(user, workspace, role="member"):
    return WorkspaceMembership.objects.create(user=user, workspace=workspace, role=role)
