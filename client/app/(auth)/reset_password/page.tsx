import ResetPasswordForm from "@/components/ResetPasswordForm";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-between">
      <div className="flex max-w-sm flex-col justify-center">
        <h3 className="mb-4 text-4xl font-bold text-text">
          Reset your password
        </h3>
        <p className="mb-4 text-sm">
          Enter the email address associated with your account and we
          <span>&apos;</span>ll send you a link to reset your password.
        </p>
        <ResetPasswordForm />

        <div className="mt-2">
          <p className="text-sm">
            <Link
              className="font-semibold text-secondary underline"
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
