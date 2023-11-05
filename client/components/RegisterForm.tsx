"use client";
import React from "react";
import Form from "./ui/form";
import { useRegister } from "@/hooks/useRegister";
import SocialButtons from "./SocialButtons";

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
    <div className="grid gap-6">
      <Form
        config={config}
        register={registerInput}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        btnText="Sign up"
        // getValues={getValues}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SocialButtons />
    </div>
  );
};

export default RegisterForm;
