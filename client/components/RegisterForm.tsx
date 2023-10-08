import React from "react";
import Form from "./ui/form";
import { useRegister } from "@/hooks/useRegister";

const config = [
  {
    id: "first_name",
    label: "First Name",
    type: "text",
  },
  {
    id: "last_name",
    label: "Last Name",
    type: "text",
  },
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
  {
    id: "re_password",
    label: "Confirm Password",
    type: "password",
  },
];
const RegisterForm = () => {
  const { registerInput, errors, onSubmit, handleSubmit, isLoading } =
    useRegister();
  return (
    <Form
      config={config}
      register={registerInput}
      errors={errors}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      btnText="Sign up"
    />
  );
};

export default RegisterForm;
