import React from "react";
import Workspace from "@/components/dashboard/Workspace";

const page = ({ params }: { params: { workspace: string } }) => {
  return (
    <div className="p-10">
      <div>{params.workspace}</div>
      <Workspace />
    </div>
  );
};

export default page;
