from typing import Literal

import stripe

from authorization.models import User
from payments.models import StripeUser


def get_or_create_stripe_customer(user: User):
    """
    Get or create a test Stripe customer for a given user.
    """
    try:
        stripe_user = StripeUser.objects.get(user=user)
    except StripeUser.DoesNotExist:
        customer = stripe.Customer.create(
            email=user.email,
            name=f"{user.first_name} {user.last_name}",
            description="Test customer for Newsltr",
            payment_method="pm_card_visa",
            invoice_settings={
                "default_payment_method": "pm_card_visa",
            },
        )

        stripe_user = StripeUser.objects.create(user=user, customer_id=customer.id)
        stripe_user.save()

    return stripe_user


def create_subscription(
    stripe_user: StripeUser,
    plan: Literal["basic", "pro", "enterprise"] = "basic",
    interval: Literal["month", "year"] = "month",
):
    plans = {
        "basic": {
            "month": "price_1O5ClvKwAtttJJGBvSigfzXw",
            "year": "price_1O5ClvKwAtttJJGBQVyNoWk5",
        },
        "pro": {
            "month": "price_1O5CmbKwAtttJJGBByldyYY2",
            "year": "price_1O5CmbKwAtttJJGBeLtUzl2H",
        },
        "enterprise": {"month": "price_1O5CnKKwAtttJJGBpy1QGLbQ"},
    }

    stripe.Subscription.create(
        customer=stripe_user.customer_id,
        items=[
            {
                "price": plans[plan][interval],
            }
        ],
    )
