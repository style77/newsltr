from django.contrib import admin

# Register your models here.

from .models import Workspace, WorkspaceMembership, WorkspaceAPIKey

admin.site.register(Workspace)
admin.site.register(WorkspaceMembership)
admin.site.register(WorkspaceAPIKey)
