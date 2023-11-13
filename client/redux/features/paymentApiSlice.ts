import { apiSlice } from "../services/apiSlice";

interface Subscription {
  id: string;
  current_period_end: string;
  cancel_at: string;
  status: string;
  prices: number[];
  currency: string;
  name: string;
  description: string;
}
const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveSubscriptions: builder.query<Subscription[], void>({
      query: () => "/payment/subscriptions/",
    }),
  }),
});

export const { useRetrieveSubscriptionsQuery } = paymentApiSlice;
