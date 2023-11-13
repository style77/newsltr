from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.


class StripeUser(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="stripe_user",
        primary_key=True,
    )
    customer_id = models.CharField(max_length=128, null=False)
