from django.contrib import admin

from .models import Workspace, WorkspaceAPIKey, WorkspaceMembership

# Register your models here.


admin.site.register(Workspace)
admin.site.register(WorkspaceMembership)
admin.site.register(WorkspaceAPIKey)
