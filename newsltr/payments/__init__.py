import stripe

from django.conf import settings

stripe.set_app_info(
    "Newsltr",
    version="0.0.1",
    url=""  # todo: add url
)
stripe.api_key = settings.STRIPE_KEY
stripe.api_version = "2023-10-16"
