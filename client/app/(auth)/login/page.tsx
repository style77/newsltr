import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center max-w-sm">
        <h2 className="text-text text-4xl font-bold mb-4">Welcome Back.</h2>
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
