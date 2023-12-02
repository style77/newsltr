import { apiSlice } from "../services/apiSlice";

import { Subscription } from "@/lib/types";

interface Plan {
  id: string;
  current_period_end: string;
  // cancel_at: null;
  status: "active" | "incompleted";
  price: number;
  currency: "usd";
  plan_name: "Basic | Pro | Enteprise";
  plan_description: string;
}
const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveSubscriptions: builder.query<Subscription[], void>({
      query: () => "/payment/subscriptions/",
    }),
    subscribe: builder.mutation({
      query: ({ price_id }) => ({
        url: "/payment/subscribe/",
        method: "POST",
        body: { price_id },
        headers: {
          Accept: "application/json",
        },
      }),
    }),
    retrieveUserSubscriptions: builder.query<Plan[], void>({
      query: () => "/payment/me/subscriptions/",
    }),
    cancelSubscription: builder.mutation({
      query: ({ subscription_id }) => ({
        url: "/payment/me/subscriptions/cancel/",
        method: "POST",
        body: { subscription_id },
      }),
    }),
    resumeSubscription: builder.mutation({
      query: ({ subscription_id }) => ({
        url: "/payment/me/subscriptions/resume/",
        method: "POST",
        body: { subscription_id },
      }),
    }),
  }),
});

export const {
  useRetrieveSubscriptionsQuery,
  useRetrieveUserSubscriptionsQuery,
  useSubscribeMutation,
  useResumeSubscriptionMutation,
  useCancelSubscriptionMutation,
} = paymentApiSlice;
