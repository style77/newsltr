from authorization.tests.mixins import UserTestCaseMixin
from .providers import CustomerProvider
from workspaces.tests.mixins import WorkspaceTestCaseMixin, WorkspaceKeyTestCaseMixin


class WithSubscriptionTestMixin(UserTestCaseMixin):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.provider = CustomerProvider()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        del cls.provider


class WithSubscriptionAndWorkspaceTestMixin(
    WithSubscriptionTestMixin, WorkspaceTestCaseMixin
):
    def setUp(self):
        super().setUp()


class WithSubscriptionAndWorkspaceAndKeysTestMixin(
    WithSubscriptionAndWorkspaceTestMixin,
    WorkspaceKeyTestCaseMixin
):
    def setUp(self):
        super().setUp(
)
