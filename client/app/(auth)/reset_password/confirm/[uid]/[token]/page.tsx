import ResetPasswordConfirmForm from "@/components/ResetPasswordConfirmForm";
import Link from "next/link";

interface ParamsProps {
  params: {
    uid: string;
    token: string;
  };
}

const Page = ({ params }: ParamsProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex max-w-sm flex-col justify-center">
        <h3 className="mb-4 text-4xl font-bold text-text">
          Reset your password
        </h3>
        <p className="mb-4 text-sm"></p>
        <ResetPasswordConfirmForm {...params} />

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
