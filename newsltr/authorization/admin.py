from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import User


class UserAdmin(ModelAdmin):
    ...


admin.site.register(User, UserAdmin)
