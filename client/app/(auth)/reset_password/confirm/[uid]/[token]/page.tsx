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
      <div className="flex flex-col justify-center max-w-sm">
        <h3 className="text-text text-4xl font-bold mb-4">
          Reset your password
        </h3>
        <p className="text-sm mb-4"></p>
        <ResetPasswordConfirmForm {...params} />

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
