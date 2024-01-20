"use client";
import React from "react";

import Editor from "@/components/dashboard/Editor";
import { Button } from "../ui/button";

const AddTemplate = () => {
  return (
    <>
      <Editor />
      <Button className="rounded-none" size="full">
        Add Template
      </Button>
    </>
  );
};

export default AddTemplate;
