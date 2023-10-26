from django.contrib import admin

# Register your models here.

from .models import (
    Product,
    Price,
    Feature,
    ProductFeature,
    StripeUser,
    SubscriptionItem,
    Subscription
)

admin.site.register(Product)
admin.site.register(Price)
admin.site.register(Feature)
admin.site.register(ProductFeature)
admin.site.register(StripeUser)
admin.site.register(SubscriptionItem)
admin.site.register(Subscription)
