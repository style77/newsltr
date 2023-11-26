"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSubscribeMutation } from "@/redux/features/paymentApiSlice";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_KEY}`);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const options = {
    clientSecret: clientSecret,
  };

  const [subscribe, { isLoading: isSubscribeLoading }] = useSubscribeMutation();

  useEffect(() => {
    const getSessionId = async () => {
      const { client_secret, ...rest } = await subscribe({
        price_id: "price_1O5CmbKwAtttJJGBeLtUzl2H",
      }).unwrap();
      setClientSecret(client_secret);
      console.log(rest);
    };

    getSessionId();
  }, []);

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
