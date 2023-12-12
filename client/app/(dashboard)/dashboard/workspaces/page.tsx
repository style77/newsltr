import React from "react";
import Workspaces from "@/components/dashboard/Workspaces";

const page = () => {
  return (
    <div className="grow">
      <div className="w-[1480px] bg-background2 h-full p-10">
        <h2 className="text-3xl font-bold mb-6">Workspaces</h2>
        <Workspaces />
      </div>
    </div>
  );
};

export default page;
