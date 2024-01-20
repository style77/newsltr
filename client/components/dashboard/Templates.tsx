"use client";
import React from "react";
import { useParams } from "next/navigation";

import { useRetrieveTemplatesQuery } from "@/redux/features/templatesApiSlice";
import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";

const Templates = () => {
  const { workspace } = useParams();
  console.log(workspace);
  const { data, isLoading } = useRetriveWorkspaceQuery({ id: workspace });

  const campaignId = data?.campaign;
  const { data: templates, isLoading: isTemplatesLoading } =
    useRetrieveTemplatesQuery(campaignId);

  if (isLoading) {
    return <div className="text-red-400">loading</div>;
  }

  return (
    <ul>
      {templates?.results.map((template) => (
        <li key={template.id}>{template.id}</li>
      ))}
    </ul>
  );
};

export default Templates;
