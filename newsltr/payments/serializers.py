import stripe
from rest_framework import serializers


class ConfigSerializer(serializers.Serializer):
    publishable_key = serializers.CharField()


class PriceSerializer(serializers.Serializer):
    price_id = serializers.CharField(source="id")
    unit_amount = serializers.IntegerField()
    currency = serializers.CharField()
    interval = serializers.CharField(source="recurring.interval")
    trial_period_days = serializers.IntegerField(source="recurring.trial_period_days")


class ProductSerializer(serializers.Serializer):
    product_id = serializers.CharField(source="id")
    name = serializers.CharField()
    description = serializers.CharField()
    features = serializers.ListField()
    prices = serializers.SerializerMethodField()

    def get_prices(self, obj) -> list:
        data = stripe.Price.list(product=obj.id).data
        return [PriceSerializer(price).data for price in data]


class CreateSubscriptionSerializer(serializers.Serializer):
    price_id = serializers.CharField()


class CancelResumeSubscriptionSerializer(serializers.Serializer):
    subscription_id = serializers.CharField()


class SubscriptionSerializer(serializers.Serializer):
    id = serializers.CharField()
    current_period_end = serializers.DateTimeField()
    cancel_at = serializers.DateTimeField(allow_null=True)
    status = serializers.CharField()
    price = serializers.IntegerField(required=False)
    currency = serializers.CharField(required=False)
    plan_name = serializers.CharField(max_length=255, required=False)
    plan_description = serializers.CharField(max_length=500, required=False)
