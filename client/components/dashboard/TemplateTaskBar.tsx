"use client";
import React from "react";
import { Button } from "../ui/button";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";

const TemplateTaskBar = () => {
  const router = useRouter();
  return (
    <div className="mb-4">
      <Button variant="dashboard" onClick={() => router.push("templates/add")}>
        <MdAdd className="mr-2" size={18} />
        Add a template
      </Button>
    </div>
  );
};

export default TemplateTaskBar;
