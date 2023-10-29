import stripe

from django.conf import settings

stripe_api = stripe

stripe_api.api_key = settings.STRIPE_SECRET_KEY
stripe_api.api_version = "2023-10-16"
