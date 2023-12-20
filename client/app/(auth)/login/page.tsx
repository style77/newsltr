import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-between">
      <div className="flex max-w-sm flex-col justify-center text-text">
        <h2 className="mb-4 text-4xl font-bold">Welcome Back.</h2>
        <p className="mb-4 text-2xl font-semibold">Log in to your account</p>
        <LoginForm />
        <div className="mt-2">
          <p className="text-sm">
            Don<span>&apos;</span>t have an account?{" "}
            <Link
              className="font-semibold text-secondary underline"
              href="/register"
            >
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
