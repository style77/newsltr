from django.urls import path
from rest_framework import routers

from .views import Checkout, MySubscriptions, Subscriptions

router = routers.DefaultRouter()
router.register(
    r"me/subscriptions", MySubscriptions, basename="my-subscriptions"
)

urlpatterns = [
    path("subscribe/", Checkout.as_view(), name="payment-create-subscription"),
    path(
        "subscriptions/", Subscriptions.as_view(), name="payment-subscriptions"
    ),
] + router.urls
