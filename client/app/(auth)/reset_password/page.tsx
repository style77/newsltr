import ResetPasswordForm from "@/components/ResetPasswordForm";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center max-w-sm">
        <h3 className="text-text text-4xl font-bold mb-4">
          Reset your password
        </h3>
        <p className="text-sm mb-4">
          Enter the email address associated with your account and we
          <span>&apos;</span>ll send you a link to reset your password.
        </p>
        <ResetPasswordForm />

        <div className="mt-2">
          <p className="text-sm">
            <Link
              className="text-secondary underline font-semibold"
              href="/register"
            >
              Return to Log in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
