import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-between">
      <div className="text-text flex flex-col justify-center max-w-sm">
        <h2 className="text-4xl font-bold mb-4">Welcome Back.</h2>
        <p className="text-2xl font-semibold mb-4">Log in to your account</p>
        <LoginForm />
        <div className="mt-2">
          <p className="text-sm">
            Don<span>&apos;</span>t have an account?{" "}
            <Link
              className="text-secondary underline font-semibold"
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
