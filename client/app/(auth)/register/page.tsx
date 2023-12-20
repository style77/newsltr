// "use client";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import SocialButtons from "@/components/SocialButtons";

const Page = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center text-text">
        <h2 className="mb-4 text-4xl font-bold text-text">
          Welcome to Newsltr.
        </h2>
        <p className="mb-4 text-2xl font-semibold">
          Create your Newsltr account
        </p>
        <RegisterForm />
        <div className="mt-2">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              className="font-semibold text-secondary underline"
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
