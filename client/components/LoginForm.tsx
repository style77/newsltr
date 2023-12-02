"use client";
import React from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAppSelector } from "@/redux/hooks";
import Form from "./ui/CustomForm";
import Error from "./Error";

const config = [
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
];
const LoginForm = () => {
  const {
    registerInput,
    errors,
    onSubmit,
    handleSubmit,
    isLoading,
    getValues,
    error,
  } = useLogin();

  const isAuth = useAppSelector((state) => state.auth.isUserAuthenticated);
  console.log(isAuth);

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
        btnText="Log in"
        getValues={getValues}
      />
    </>
  );
};

export default LoginForm;
