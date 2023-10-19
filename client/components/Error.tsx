import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AlertTriangleIcon } from "lucide-react";
export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

interface ErrorProps {
  error?: FetchBaseQueryError | SerializedError;
}

const Error = ({ error }: ErrorProps) => {
  let ErrorMessage;
  console.log(error);
  if (error && "status" in error) {
    const e = error.data as { detail: string };
    ErrorMessage = e.detail;
  }
  return (
    <>
      {error && (
        <div className="flex gap-2 border border-error rounded-md p-2 bg-red-100 text-error mb-2">
          <AlertTriangleIcon />
          {ErrorMessage}
        </div>
      )}
    </>
  );
};

export default Error;
