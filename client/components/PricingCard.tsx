import { Subscription } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { AiFillCheckCircle } from "react-icons/ai";

interface PricingCardProps {
  subscription: Subscription;
  isPro?: boolean;
  isYearly: boolean;
}

const PricingCard = ({ subscription, isPro, isYearly }: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col px-9 py-9 rounded-md shadow-1 w-[360px] ${
        isPro
          ? "bg-secondary text-white grow bg-card-decor bg-no-repeat bg-right-top h-[700px]"
          : "text-text border border-border h-[522px]"
      }`}
      key={subscription.product_id}
    >
      <h2 className="text-3xl text-center font-semibold mb-4">
        {subscription.name}
      </h2>
      <p className="text-center mb-4">{subscription.description}</p>
      <span className="self-center text-5xl font-bold mb-12">
        ${subscription.prices[isYearly ? 0 : 1].unit_amount / 100}
        <span className="text-xl">/{isYearly ? "year" : "month"}</span>
      </span>
      <ul className="grow space-y-2">
        {subscription.features.map((feature, i) => (
          <div key={i} className="flex gap-2">
            <div>
              <AiFillCheckCircle size={24} className="text-green-500" />
            </div>
            <li>{feature.name}</li>
          </div>
        ))}
      </ul>
      <Button className="bg-primary text-text">Subscribe</Button>
    </div>
  );
};

export default PricingCard;
