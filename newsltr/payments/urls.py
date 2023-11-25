from django.urls import path
from rest_framework import routers

from .views import Checkout, MySubscriptions, Subscriptions, Config

router = routers.DefaultRouter()
router.register(r"me/subscriptions", MySubscriptions, basename="my-subscriptions")

urlpatterns = [
    path("config/", Config.as_view(), name="payment-config"),
    path("subscribe/", Checkout.as_view(), name="payment-create-subscription"),
    path("subscriptions/", Subscriptions.as_view(), name="payment-subscriptions"),
] + router.urls
