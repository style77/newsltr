from authorization.tests.mixins import UserTestCaseMixin
from workspaces.tests.mixins import (WorkspaceKeyTestCaseMixin,
                                     WorkspaceTestCaseMixin)

from .providers import CustomerProvider


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
    WithSubscriptionAndWorkspaceTestMixin, WorkspaceKeyTestCaseMixin
):
    def setUp(self):
        super().setUp()
