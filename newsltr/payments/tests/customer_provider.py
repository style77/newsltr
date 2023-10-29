import stripe

from payments.customers import get_or_create_stripe_customer


class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class CustomerProvider(metaclass=SingletonMeta):
    def __init__(self):
        self.created_customers = []

    def __del__(self):
        for customer in self.created_customers:
            stripe.Customer.delete(customer.customer_id)

    def create_customer(self, user):
        stripe_user = get_or_create_stripe_customer(user)
        self.created_customers.append(stripe_user)
        return stripe_user
