"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useAppSelector } from "@/redux/hooks";
import { useRetrieveUserSubscriptionsQuery } from "@/redux/features/paymentApiSlice";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_KEY}`);

const Payment = () => {
  const { data } = useRetrieveUserSubscriptionsQuery({});
  const { clientSecret } = useAppSelector((state) => state.payment);
  console.log(data);

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <div className="max-w-xl mx-auto pt-20">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options} key={clientSecret}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
