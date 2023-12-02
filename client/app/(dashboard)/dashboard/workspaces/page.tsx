import React from "react";
import Workspaces from "@/components/dashboard/Workspaces";

const page = () => {
  return (
    <div className="grow">
      <div className="w-[1480px] bg-background2 h-full p-10">
        <Workspaces />
      </div>
    </div>
  );
};

export default page;
