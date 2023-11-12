from datetime import datetime
from django.http import HttpResponseRedirect

import stripe
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from django.conf import settings

from .customers import get_or_create_stripe_customer
from .serializers import (
    CancelSubscriptionSerializer,
    CreateSubscriptionSerializer,
    ProductSerializer,
    SubscriptionSerializer,
)


@extend_schema(
    tags=["payments"],
)
class Checkout(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CreateSubscriptionSerializer

    def post(self, request, *args, **kwargs):
        """
            Subscribe to plan, this endpoint will redirect user to checkout session
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        stripe_user = get_or_create_stripe_customer(request.user)

        session = stripe.checkout.Session.create(
            client_reference_id=request.user.id,
            success_url=settings.FRONT_END_BASE_URL
            + "/workspaces?checkout_id={CHECKOUT_SESSION_ID}",
            cancel_url=settings.FRONT_END_BASE_URL + "/payment/cancel",
            payment_method_types=["card"],
            customer=stripe_user.customer_id,
            mode="subscription",
            line_items=[
                {
                    "price": data.get("price_id"),
                    "quantity": 1,
                }
            ],
        )

        return HttpResponseRedirect(session.url)


@extend_schema(
    tags=["payments"],
)
class Subscriptions(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        """
        Get all subscription plans
        """
        subscribed_product_ids = []
        if request.user.is_authenticated:
            stripe_user = get_or_create_stripe_customer(request.user)
            customer_id = stripe_user.customer_id

            user_subscriptions = stripe.Subscription.list(customer=customer_id)
            subscribed_product_ids = set(
                subscription["items"]["data"][0]["price"]["product"]
                for subscription in user_subscriptions.data
            )

        all_products = stripe.Product.list(active=True, expand=["data.price"])
        available_products = [
            product
            for product in all_products.data
            if product.id not in subscribed_product_ids
        ]

        serializer = self.serializer_class(available_products, many=True)

        return Response(serializer.data)


@extend_schema(
    tags=["payments"],
)
class MySubscriptions(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SubscriptionSerializer

    def get_serializer_class(self):
        if self.action in ["cancel", "resume"]:
            return CancelSubscriptionSerializer
        return self.serializer_class

    def list(self, request, *args, **kwargs):
        """
        Get all current user subscriptions
        """
        stripe_user = get_or_create_stripe_customer(request.user)
        user_subscriptions = stripe.Subscription.list(
            customer=stripe_user.customer_id,
        )

        subscription_data = []
        for subscription in user_subscriptions.data:
            cancel_at = (
                datetime.fromtimestamp(subscription["cancel_at"])
                if subscription.get("cancel_at")
                else None
            )

            subscription_dict = {
                "id": subscription["id"],
                "cancel_at": cancel_at,
                "current_period_end": datetime.fromtimestamp(
                    subscription["current_period_end"]
                ),
                "status": subscription["status"],
            }

            if "items" in subscription and "data" in subscription["items"]:
                subscription_item = subscription["items"]["data"][0]
                if "price" in subscription_item:
                    subscription_dict["price"] = subscription_item["price"][
                        "unit_amount"
                    ]
                    subscription_dict["currency"] = subscription_item["price"][
                        "currency"
                    ]
                    price = stripe.Price.retrieve(subscription_item["price"]["id"])
                    product = stripe.Product.retrieve(price.product)
                    subscription_dict["plan_name"] = product.name
                    subscription_dict["plan_description"] = product.description

            subscription_data.append(subscription_dict)

        serializer = self.serializer_class(data=subscription_data, many=True)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def resume(self, request, *args, **kwargs):
        """
        Resume a subscription
        """
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        try:
            stripe.Subscription.modify(
                data.get("subscription_id"), cancel_at_period_end=False
            )
        except stripe.error.InvalidRequestError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def cancel(self, request, *args, **kwargs):
        """
        Cancel a subscription
        """
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        try:
            stripe.Subscription.modify(
                data.get("subscription_id"),
                cancel_at_period_end=True,
            )
        except stripe.error.InvalidRequestError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
