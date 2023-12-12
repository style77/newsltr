"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import PlansCard from "./PlansCard";
import { MdAdd } from "react-icons/md";
import { useRetrieveSubscriptionsQuery } from "@/redux/features/paymentApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeSubscriptionDialog } from "@/redux/features/dialogSlice";
import { motion } from "framer-motion";

const SubscriptionDialog = () => {
  const [isYearly, setIsYearly] = useState(false);

  const dispatch = useAppDispatch();
  const { isSubscriptionDialogOpen } = useAppSelector((state) => state.dialog);
  const { data: subscriptions, isLoading } = useRetrieveSubscriptionsQuery();

  const handleCloseDialog = () => {
    dispatch(closeSubscriptionDialog());
  };

  const togglePricing = () => {
    setIsYearly((prevIsYearly) => !prevIsYearly);
  };

  return (
    <Dialog open={isSubscriptionDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Can&apos;t create workspaces?</DialogTitle>
          <DialogDescription>
            You need to be subscribed in order to be able to create workspaces.
          </DialogDescription>
        </DialogHeader>

        <div className="flex mb-2">
          <div
            onClick={togglePricing}
            className="px-2 relative flex w-40 h-11 items-center text-center bg-background2 rounded-full cursor-pointer"
          >
            <motion.div className="pr-2 flex-1 text-secondary">
              Month
            </motion.div>
            <div className="pl-2 flex-1">Year</div>
            <motion.div
              layout
              className={`absolute rounded-full flex items-center justify-center text-background2 ${
                isYearly ? "right-0" : "left-0"
              } h-full w-20 bg-secondary`}
            >
              {isYearly ? "Year" : "Month"}
            </motion.div>
          </div>
        </div>
        <>
          <div className="flex flex-row-reverse gap-x-4 mb-2">
            {!isLoading ? (
              subscriptions?.map((subscription) => (
                <PlansCard
                  key={subscription.product_id}
                  subscription={subscription}
                  isPro={subscription.name === "Pro"}
                  isYearly={isYearly}
                />
              ))
            ) : (
              <>
                <Skeleton className="flex-1 h-[334px]" />
                <Skeleton className="flex-1 h-[334px]" />
                <Skeleton className="flex-1 h-[334px]" />
              </>
            )}
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
