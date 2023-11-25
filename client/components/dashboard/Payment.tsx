"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSubscribeMutation } from "@/redux/features/paymentApiSlice";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const options = {
    clientSecret: clientSecret,
  };

  const [subscribe, { isLoading: isSubscribeLoading }] = useSubscribeMutation();

  useEffect(() => {
    const getSessionId = async () => {
      const { sessionId } = await subscribe({
        price_id: "price_1O5CmbKwAtttJJGBeLtUzl2H",
      }).unwrap();
      setClientSecret(sessionId);
      console.log(sessionId);
    };

    getSessionId();
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
