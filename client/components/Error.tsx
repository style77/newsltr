import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AlertTriangleIcon } from "lucide-react";
import { useResendActivationEmail } from "@/hooks/useResenActivationEmail";
import Spinner from "./ui/spinner";
import { FieldValues, UseFormGetValues } from "react-hook-form";

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

interface ErrorProps<T extends FieldValues> {
  error?: FetchBaseQueryError | SerializedError;
  getValues: UseFormGetValues<T>;
}

const Error = <T extends FieldValues>({ error, getValues }: ErrorProps<T>) => {
  let errorMessage;
  console.log(error);
  if (error && "status" in error) {
    const e = error.data as { detail: string };
    errorMessage = e.detail;
  }

  const { resendActivationEmail, isLoading } =
    useResendActivationEmail(getValues);
  return (
    <>
      {error && (
        <div className="mb-2 rounded-md border border-error bg-red-100 p-2.5 align-top text-sm text-error">
          <div className="mb-2 flex gap-2">
            <AlertTriangleIcon size={16} />
            <span>{errorMessage}</span>
          </div>
          <div className="flex justify-end">
            {errorMessage?.toString().includes("not active") && (
              <button
                type="button"
                onClick={resendActivationEmail}
                className="text-sm font-semibold text-secondary underline"
              >
                {isLoading ? <Spinner /> : "Resend activation email"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
