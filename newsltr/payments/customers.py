import stripe

from .models import StripeUser


def get_or_create_stripe_customer(user):
    """
    Get or create a Stripe customer for a given user.
    """
    try:
        stripe_user = StripeUser.objects.get(user=user)
    except StripeUser.DoesNotExist:
        customer = stripe.Customer.create(
            email=user.email,
            name=f"{user.first_name} {user.last_name}",
        )

        stripe_user = StripeUser.objects.create(user=user, customer_id=customer.id)
        stripe_user.save()

    return stripe_user
