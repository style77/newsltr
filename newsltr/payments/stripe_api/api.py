import stripe

from newsltr.settings import STRIPE_KEY

stripe.api_key = STRIPE_KEY
stripe.api_version = "2023-10-16"

stripe_api = stripe
