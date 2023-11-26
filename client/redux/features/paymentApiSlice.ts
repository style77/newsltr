import { apiSlice } from "../services/apiSlice";

import { Subscription } from "@/lib/types";

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
    retrieveUserSubscriptions: builder.query({
      query: () => "/payment/me/subscriptions/",
    }),
  }),
});

export const {
  useRetrieveSubscriptionsQuery,
  useRetrieveUserSubscriptionsQuery,
  useSubscribeMutation,
} = paymentApiSlice;
