"use client";
import React from "react";
import Editor from "./Editor";
import TemplateSelect from "./TemplateSelect";
import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";
import { useParams } from "next/navigation";

export const Campaign = ({ campaign }: { campaign: string }) => {
  // const { workspace } = useParams();
  // console.log(workspace);
  // const { data, isLoading } = useRetriveWorkspaceQuery({ id: workspace });
  // if (isLoading) {
  //   return <div>loading</div>;
  // }
  // const { campaign } = data;
  return (
    <div className="border-border border rounded-lg flex">
      <div className="border-border border-r">
        <Editor />
      </div>
      <TemplateSelect campaignId={campaign} />
    </div>
  );
};
