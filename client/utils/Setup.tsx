"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useVerify } from "@/hooks/useVerify";

const Setup = () => {
  useVerify();
  return <Toaster />;
};

export default Setup;
