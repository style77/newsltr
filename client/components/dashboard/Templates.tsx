"use client";
import React from "react";
import { useParams } from "next/navigation";

import { useRetrieveTemplatesQuery } from "@/redux/features/templatesApiSlice";
import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

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

  console.log(templates);

  return (
    <ul>
      {templates?.results.map(({ id, name }) => (
        <Link href={id} className="bg-red-50 p-3 flex justify-between" key={id}>
          <span>{name}</span>
          <MoreVertical />
        </Link>
      ))}
    </ul>
  );
};

export default Templates;
