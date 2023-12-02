"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import Form from "./ui/CustomForm";
import Error from "./Error";
import { useResetPassword } from "@/hooks/useResetPassword";

const config = [
  {
    id: "email",
    label: "Email",
    type: "email",
  },
];

const ResetPasswordForm = () => {
  const {
    registerInput,
    errors,
    onSubmit,
    handleSubmit,
    isLoading,
    getValues,
    error,
  } = useResetPassword();

  const isAuth = useAppSelector((state) => state.auth.isUserAuthenticated);
  console.log("error", error);

  return (
    <>
      <Error error={error} getValues={getValues} />
      <Form
        config={config}
        register={registerInput}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        btnText="Continue"
        getValues={getValues}
      />
    </>
  );
};

export default ResetPasswordForm;
