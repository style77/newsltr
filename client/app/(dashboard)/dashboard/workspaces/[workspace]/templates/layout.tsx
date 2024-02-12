import React from "react";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import Templates from "@/components/dashboard/Templates";
import TemplateTaskBar from "@/components/dashboard/TemplateTaskBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardHeading>Manage Templates</DashboardHeading>
      <TemplateTaskBar />
      <div className="flex w-full">
        <div className="w-1/3 min-h-[480px] border border-r-0 border-border rounded-l-lg">
          <div className="flex items-center border-b border-border p-3 h-14 font-bold">
            <h2>Templates</h2>
          </div>
          <Templates />
        </div>
        {children}
      </div>
    </>
  );
};

export default layout;
