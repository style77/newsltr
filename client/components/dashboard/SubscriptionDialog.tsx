"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import PlansCard from "./PlansCard";
import { MdAdd } from "react-icons/md";
import {
  useRetrieveSubscriptionsQuery,
  useSubscribeMutation,
} from "@/redux/features/paymentApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onClose } from "@/redux/features/dialogSlice";

const SubscriptionDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.dialog);
  const { data: subscriptions, isLoading } = useRetrieveSubscriptionsQuery();
  const [subscribe, { isLoading: isSubscribeLoading }] = useSubscribeMutation();

  const handleCloseDialog = () => {
    dispatch(onClose());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Can&apos;t create workspaces?</DialogTitle>
          <DialogDescription>
            You need to be subscribed in order to be able to create workspaces.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row-reverse gap-x-4 mb-2">
          {subscriptions?.map((subscription) => (
            <PlansCard
              key={subscription.product_id}
              subscription={subscription}
              isPro={subscription.name === "Pro"}
              // isYearly={isYearly}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
