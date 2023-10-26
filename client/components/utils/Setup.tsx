"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useVerify } from "@/hooks/useVerify";
import Spinner from "../ui/spinner";

const Setup = () => {
  const isLoading = useVerify();

  return <Toaster />;
};

export default Setup;
