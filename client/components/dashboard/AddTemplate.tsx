import React from "react";

import Editor from "@/components/dashboard/Editor";
import { CreateTemplateForm } from "@/components/dashboard/CreateTemplateForm";
import { useRetrieveTemplateQuery } from "@/redux/features/templatesApiSlice";

const option = {
  name: "",
  subject: "",
  content: "",
};

const AddTemplate = () => {
  return (
    <>
      <Editor content="">
        <CreateTemplateForm option={option} action="Add Template" />
      </Editor>
    </>
  );
};

export default AddTemplate;
