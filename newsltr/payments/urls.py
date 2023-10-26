from django.urls import path

from . import views

urlpatterns = [
    path('me/subscription/', views.Subscription.as_view()),
    path('me/subscription/details/', views.SubscriptionItems.as_view()),
    path('subscriptions/', views.SubscribableProductPrice.as_view()),
    path('checkout/', views.CreateStripeCheckoutSession.as_view()),
    path('webhook/', views.StripeWebhook.as_view()),
    path('customer-portal/', views.StripeCustomerPortal.as_view())
]
