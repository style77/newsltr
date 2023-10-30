from authorization.tests.mixins import UserTestCaseMixin
from .common import create_workspace
from workspaces.models import WorkspaceAPIKey


class WorkspaceTestCaseMixin(UserTestCaseMixin):
    def setUp(self):
        super().setUp()
        self.workspace, _ = create_workspace(None, None, self.user)


class WorkspaceKeyTestCaseMixin(WorkspaceTestCaseMixin):
    def setUp(self):
        super().setUp()
        self.key, _ = WorkspaceAPIKey.objects.create(
            workspace=self.workspace, name="Test Key"
        )
