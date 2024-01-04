"use client";
import React, { useState } from "react";
import BillingCycleButton from "./BillingCycleButton";
import PricingCard from "./PricingCard";

const Pricing = () => {
  const [selected, setSelected] = useState<"Month" | "Year">("Month");

  const handleToggleCycle = (value: "Month" | "Year") => setSelected(value);

  return (
    <section className="bg-bg-1 bg-right-top bg-no-repeat py-20">
      <div className="mx-auto max-w-6xl px-4 pt-20 text-text ">
        <h2 className="mb-8 text-6xl font-bold lg:text-center">
          Choose your plan
        </h2>
        <p className="text-lg lg:text-3xl">
          Explore our flexible pricing options and find the plan that aligns
          with your unique needs and budget.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center">
        <BillingCycleButton value={selected} onClick={handleToggleCycle} />
        <div className="mt-12 flex w-full flex-col items-center gap-5 px-4 lg:justify-center xl:flex-row">
          <PricingCard name="Basic" price="$46" description="" />
          <PricingCard name="Pro" price="$136" description="" isBestPrice />
          <PricingCard name="Enterprise" price="$146" description="" />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
