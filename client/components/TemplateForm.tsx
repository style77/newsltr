import React from "react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const TemplateForm = () => {
  return <div>TemplateForm</div>;
};

export default TemplateForm;
