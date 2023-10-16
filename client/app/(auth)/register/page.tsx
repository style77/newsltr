"use client";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

const Page = () => {
  return (
    <div className="flex justify-between">
      <div className=" flex flex-col justify-center">
        <h2 className="text-text text-4xl font-bold mb-4">
          Welcome to Newsltr.
        </h2>
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
