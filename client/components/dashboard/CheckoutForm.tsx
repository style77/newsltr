import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useRetrieveUserSubscriptionsQuery } from "@/redux/features/paymentApiSlice";
import Spinner from "../ui/spinner";
import { useState } from "react";

const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const { data, isLoading } = useRetrieveUserSubscriptionsQuery();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    console.log(result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      setErrorMessage(result?.error?.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || data.length === 0) {
    console.log(data);
    return <div>No subscription data found.</div>;
  }

  const { price, plan_name, currency } = data[0];

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span>Total ({currency.toUpperCase()})</span>
          <span>${price / 100}.00</span>
        </div>
        <Button disabled={!stripe} className="w-full font-bold">
          {!stripe ? "loading" : `Subscribe to ${plan_name}`}
        </Button>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </form>
  );
};

export default CheckoutForm;
