import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
  return <div>{ErrorMessage}</div>;

  // return <div>error</div>;
};

export default Error;
