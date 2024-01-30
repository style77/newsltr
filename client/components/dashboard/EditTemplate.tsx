"use client";
import React from "react";

import Editor from "./Editor";

import { useRetrieveTemplateQuery } from "@/redux/features/templatesApiSlice";
import { EditTemplateForm } from "./EditTemplateForm";
import { useRetrieveCampaign } from "@/hooks/useRetrieveCampaign";
import { useParams } from "next/navigation";

const EditTemplate = () => {
  const { template: templateId } = useParams();
  const { campaign: campaignId, isLoading: campaignLoading } =
    useRetrieveCampaign();
  const { data: template, isLoading } = useRetrieveTemplateQuery({
    campaignId,
    templateId,
  });

  if (isLoading || campaignLoading) {
    return <div>Loading</div>;
  }

  const { subject, name, content } = template;
  const option = { name, subject, content };

  return (
    <Editor content={content}>
      <EditTemplateForm action="Edit Template" option={option} />
    </Editor>
  );
};

export default EditTemplate;
