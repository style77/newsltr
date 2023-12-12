"use client";
import { useRetrieveUserSubscriptionsQuery } from "@/redux/features/paymentApiSlice";
import React from "react";
import { TbBadge } from "react-icons/tb";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Subscriptions = () => {
  const {
    data: userSubscriptions,
    isLoading,
    isSuccess,
  } = useRetrieveUserSubscriptionsQuery();

  return (
    <div>
      <h3 className="text-lg font-medium">My subscriptions</h3>
      <div className=" flex justify-between items-center mt-2">
        <div className="flex space-x-2">
          <TbBadge size={22} />
          {isSuccess &&
            userSubscriptions.map((subscription) => (
              <>
                <span>Newsltr {subscription.plan_name}</span>
                <Badge variant="secondary">{subscription.status}</Badge>
              </>
            ))}
        </div>
        <div>
          <Button variant="outline">Cancel Subscription</Button>
        </div>
      </div>
      <Separator className="mt-2" />
    </div>
  );
};

export default Subscriptions;
