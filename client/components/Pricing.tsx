"use client";
import React from "react";
import Heading from "./Heading";
import { useRetrieveSubscriptionsQuery } from "@/redux/features/paymentApiSlice";

const Pricing = () => {
  const { data: subscriptions, isLoading } = useRetrieveSubscriptionsQuery();

  console.log(subscriptions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl m-auto">
        <Heading className="mb-10">Choose your plan</Heading>
        <p className="text-3xl">
          Explore our flexible pricing options and find the plan that aligns
          with your unique needs and budget.
        </p>
        <div className="flex">
          {subscriptions?.map((subscription) => (
            <div key={subscription.id}>
              <h2>{subscription.name}</h2>
              <p>{subscription.description}</p>
              <span>${subscription.prices[0].unit_amount}</span>
              <ul>
                {subscription.features.map((feature) => (
                  <li key={feature.id}>{feature.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
