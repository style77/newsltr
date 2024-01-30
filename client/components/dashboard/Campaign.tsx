"use client";
import React from "react";
import { useParams } from "next/navigation";

import Editor from "./Editor";
import TemplateSelect from "./TemplateSelect";
import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";
import { useRetrieveCampaign } from "@/hooks/useRetrieveCampaign";

export const Campaign = () => {
  // const { workspace } = useParams();
  // console.log(workspace);
  // const { data, isLoading } = useRetriveWorkspaceQuery({ id: workspace });
  //
  const { campaign, isLoading } = useRetrieveCampaign();

  if (isLoading) {
    return <div>loading</div>;
  }

  console.log(campaign);

  // const { campaign } = data;

  return (
    <div className="border-border border rounded-lg flex">
      <div className="border-border border-r">
        <Editor content="">
          <>add form for the campaign!!</>
        </Editor>
      </div>
      <TemplateSelect campaignId={campaign} />
    </div>
  );
};
