"use client";
import React from "react";
import Form from "./ui/CustomForm";
import Error from "./Error";
import { useResetPasswordConfirm } from "@/hooks/useResetPasswordConfirm";
import { ParamsType } from "@/lib/types";

const config = [
  {
    id: "new_password",
    label: "Password",
    type: "password",
  },
  {
    id: "re_new_password",
    label: "Confirm Password",
    type: "password",
  },
];

const ResetPasswordConfirmForm = (params: ParamsType) => {
  const {
    registerInput,
    errors,
    onSubmit,
    handleSubmit,
    isLoading,
    getValues,
    error,
  } = useResetPasswordConfirm(params);

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

export default ResetPasswordConfirmForm;
