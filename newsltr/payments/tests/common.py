import json
from payments.stripe_webhooks.customer_subscription import (
    _handle_customer_subscription_event_data,
)
from payments.stripe_models.event import StripeEvent
from payments.models import StripeUser


def setup_products():
    """
    Setup products in Stripe.
    """
    from payments.stripe_api.products import stripe_api_update_products_prices

    stripe_api_update_products_prices()


def setup_customer(user):
    stripe_user = StripeUser.objects.create(user_id=user.id, customer_id="cus_tester")
    return stripe_user


def setup_subscription(user, subscription="basic", time="month"):  # todo fix
    """
    Setup a subscription for a user.
    subscription: basic, pro, or enterprise
    time: month or year
    """

    setup_products()
    stripe_user = setup_customer(user)

    try:
        with open(
            r"C:\Users\style\Desktop\newsltr\newsltr\payments\tests\mock\{}_{}_product.json".format(
                subscription, time
            ),
            "r",
        ) as f:
            event = json.load(f)
            e = StripeEvent(event=event)
    except FileNotFoundError:
        raise FileNotFoundError(
            f"Subscription {subscription} for time {time} doesn't exist. Check if the file exists in the mock folder."
        )

    e.event.data.object.customer = stripe_user.customer_id

    _handle_customer_subscription_event_data(e.event.data)
    return subscription
