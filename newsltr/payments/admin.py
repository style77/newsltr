from django.contrib import admin

# Register your models here.

from .models import StripeUser

admin.site.register(StripeUser)
