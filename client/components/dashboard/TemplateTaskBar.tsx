"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";
import { MdAdd } from "react-icons/md";

const TemplateTaskBar = () => {
  const { workspace } = useParams();
  const url = `/dashboard/workspaces/${workspace}/templates/add`;

  return (
    <div className="mb-4">
      <Button variant="dashboard">
        <Link href={url}>
          <MdAdd className="mr-2" size={18} />
          Add a template
        </Link>
      </Button>
    </div>
  );
};

export default TemplateTaskBar;
