import React from "react";
import { useRouter } from "next/navigation";
import { Subscription } from "@/lib/types";
import { Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useSubscribeMutation } from "@/redux/features/paymentApiSlice";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { setClientSecret } from "@/redux/features/paymentSlice";
import { useAppDispatch } from "@/redux/hooks";

interface PlanCardProps {
  subscription: Subscription;
  isPro?: boolean;
  isYearly?: boolean;
}

const PlansCard = ({ subscription, isPro, isYearly }: PlanCardProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [subscribe, { isLoading: isSubscribeLoading }] = useSubscribeMutation();

  const onSubscibe = async () => {
    const priceId = subscription.prices[isYearly ? 0 : 1].price_id;
    try {
      const { client_secret } = await subscribe({ price_id: priceId }).unwrap();
      dispatch(setClientSecret(client_secret));
      router.push("/payment");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div
      className="flex flex-1 flex-col p-6 rounded-md border border-border"
      key={subscription.product_id}
    >
      <h2 className="text-xl font-semibold mb-2">{subscription.name}</h2>
      <p className="text-sm mb-4">{subscription.description}</p>
      <span className="text-3xl font-bold mb-12">
        ${subscription.prices[isYearly ? 0 : 1].unit_amount / 100}
        <span className="text-xl font-normal">
          /{isYearly ? "year" : "month"}
        </span>
      </span>
      <ul className="grow space-y-2 mb-4">
        {subscription.features.map((feature, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <div>
              <Check size={16} className="text-text" />
            </div>
            <li>{feature.name}.</li>
          </div>
        ))}
      </ul>
      <Button
        onClick={onSubscibe}
        variant={isPro ? "default" : "outline"}
        size="sm"
      >
        Subscribe
        {isPro && <Sparkles className="text-text ml-2" size={18} />}
      </Button>
    </div>
  );
};

export default PlansCard;
