"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import { useRetrieveSubscriptionsQuery } from "@/redux/features/paymentApiSlice";
import PricingCard from "./PricingCard";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const togglePricing = () => {
    setIsYearly((prevIsYearly) => !prevIsYearly);
  };
  const { data: subscriptions, isLoading } = useRetrieveSubscriptionsQuery();

  console.log(subscriptions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl m-auto">
        <Heading className="mb-10">Choose your plan</Heading>
        <p className="text-3xl mb-12">
          Explore our flexible pricing options and find the plan that aligns
          with your unique needs and budget.
        </p>
        <div className="flex justify-center mb-8">
          <div
            onClick={togglePricing}
            className="px-2 relative flex w-32 h-11 items-center text-center bg-background2 rounded-full cursor-pointer"
          >
            <motion.div className="pr-2 flex-1 text-secondary">
              Month
            </motion.div>
            <div className="pl-2 flex-1">Year</div>
            <motion.div
              layout
              className={`absolute rounded-full flex items-center justify-center text-background2 ${
                isYearly ? "right-0" : "left-0"
              } h-full w-16 bg-secondary`}
            >
              {isYearly ? "Year" : "Month"}
            </motion.div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-4 items-center">
          {subscriptions?.map((subscription) => (
            <PricingCard
              key={subscription.product_id}
              subscription={subscription}
              isPro={subscription.name === "Pro"}
              isYearly={isYearly}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
