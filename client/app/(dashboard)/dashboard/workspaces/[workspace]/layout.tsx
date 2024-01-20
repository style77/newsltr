import WorkspaceNav from "@/components/dashboard/WorkspaceNav";
import React from "react";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspace: string };
}) => {
  return (
    <div className="p-8">
      <WorkspaceNav workspaceId={params.workspace} />
      {children}
    </div>
  );
};

export default layout;
