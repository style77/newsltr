"use client";
import React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRetrieveTemplatesQuery } from "@/redux/features/templatesApiSlice";

type TemplatesType = {
  campaignId: string;
};

const TemplateSelect = ({ campaignId }: TemplatesType) => {
  const { data: templates, isLoading } = useRetrieveTemplatesQuery(campaignId);

  if (isLoading) {
    <div>loading...</div>;
  }

  console.log(templates);

  const renderTemplates = () => {
    if (templates?.results.length) {
      return templates.results.map((template) => (
        <SelectItem key={template.id} value={template.subject}>
          {template.subject}
        </SelectItem>
      ));
    } else {
      return <div className="p-2 h-32">You have no template!</div>;
    }
  };

  return (
    <Select>
      <SelectTrigger className="h-14 p-2 px-6 border-b border-border rounded-none rounded-tr-lg">
        <SelectValue placeholder="Choose Template">
          <ChevronsUpDown size={18} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>{renderTemplates()}</SelectContent>
    </Select>
  );
};

export default TemplateSelect;
