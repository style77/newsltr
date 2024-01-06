"use client";
import React from "react";
import { Button } from "../ui/button";
import { MdAdd } from "react-icons/md";
import { useRetrieveTemplatesQuery } from "@/redux/features/templatesApiSlice";

const Templates = ({ campaign }: { campaign: string }) => {
  const { data: templates, isLoading } = useRetrieveTemplatesQuery(campaign);
  return (
    <div>
      <div className="mb-4">
        <Button variant="dashboard">
          <MdAdd className="mr-2" size={18} />
          Add a template
        </Button>
      </div>
      <div>
        <div className="w-1/2 h-[480px] border border-border rounded-lg">
          <h2 className="border-b border-border p-2">Templates</h2>
          <ul>
            {templates?.results.map((template) => (
              <li key={template.id}>{template.id}</li>
            ))}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Templates;
