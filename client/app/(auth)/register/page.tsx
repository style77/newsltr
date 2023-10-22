"use client";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

const Page = () => {
  return (
    <div className="flex justify-between">
      <div className="text-text flex flex-col justify-center">
        <h2 className="text-text text-4xl font-bold mb-4">
          Welcome to Newsltr.
        </h2>
        <p className="text-2xl font-semibold mb-4">
          Create your Newsltr account
        </p>
        <RegisterForm />
        <div className="mt-2">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              className="text-secondary underline font-semibold"
              href="/login"
            >
              Log in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
