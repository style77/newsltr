import React from "react";
import Form from "./ui/form";
import { useLogin } from "@/hooks/useLogin";

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
  const { registerInput, errors, onSubmit, handleSubmit, isLoading } =
    useLogin();
  return (
    <Form
      config={config}
      register={registerInput}
      errors={errors}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      btnText="Log in"
    />
  );
};

export default LoginForm;
