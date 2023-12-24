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

import Editor from "@/components/dashboard/Editor";

const page = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Create Campaign</h2>
      <div className="border-border border rounded-lg   flex">
        <div className="border-border border-r">
          <Editor />
        </div>

        <Select>
          <SelectTrigger className="h-14 p-2 px-6 border-b border-border rounded-none rounded-tr-lg">
            <SelectValue placeholder="Choose Template">
              <ChevronsUpDown size={18} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="template 1">Template 1</SelectItem>
            <SelectItem value="template 1">Template 2</SelectItem>
            <SelectItem value="template 1">Template 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default page;
