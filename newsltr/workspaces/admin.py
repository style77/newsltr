from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Workspace, WorkspaceAPIKey, WorkspaceMembership


class BaseWorkspaceAdmin(ModelAdmin):
    ...


admin.site.register(Workspace, BaseWorkspaceAdmin)
admin.site.register(WorkspaceMembership, BaseWorkspaceAdmin)
admin.site.register(WorkspaceAPIKey, BaseWorkspaceAdmin)
