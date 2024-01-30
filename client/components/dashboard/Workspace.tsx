"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Campaign } from "./Campaign";
import Templates from "./Templates";
import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";
import { useParams } from "next/navigation";

const Workspace = () => {
  const { workspace } = useParams();
  const { data, isLoading } = useRetriveWorkspaceQuery({ id: workspace });
  if (isLoading) {
    return <div>loading</div>;
  }
  const { campaign } = data;
  return (
    <div>
      <Tabs defaultValue="campaign">
        <TabsList className="p-0 bg-sky-50 border border-border rounded-lg overflow-hidden mb-8">
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="campaign">
          <h2 className="text-3xl font-bold mb-6">Create Campaign</h2>
          <Campaign />
        </TabsContent>
        <TabsContent value="templates">
          <h2 className="text-3xl font-bold mb-6">Manage templates</h2>
          <Templates />
        </TabsContent>
        <TabsContent value="subscribers"></TabsContent>
        <TabsContent value="members"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Workspace;
