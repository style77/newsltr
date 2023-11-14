import { apiSlice } from "../services/apiSlice";

import { Subscription } from "@/lib/types";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveSubscriptions: builder.query<Subscription[], void>({
      query: () => "/payment/subscriptions/",
    }),
  }),
});

export const { useRetrieveSubscriptionsQuery } = paymentApiSlice;
