from django.urls import path
from rest_framework import routers
from .views import Checkout, Subscriptions, MySubscriptions

router = routers.DefaultRouter()
router.register(
    r"payment/me/subscriptions", MySubscriptions, basename="my-subscriptions"
)

urlpatterns = [
    path("payment/subscribe/", Checkout.as_view(), name="payment-create-subscription"),
    path(
        "payment/subscriptions/", Subscriptions.as_view(), name="payment-subscriptions"
    ),
] + router.urls
