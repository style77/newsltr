import React from "react";
import Form from "./ui/form";
import { useLogin } from "@/hooks/useLogin";
import { useAppSelector } from "@/redux/hooks";

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
  } = useLogin();

  const isAuth = useAppSelector((state) => state.auth.isUserAuthenticated);
  console.log(isAuth);

  return (
    <>
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
