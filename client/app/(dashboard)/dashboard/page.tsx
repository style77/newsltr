"use client";
import { UserNav } from "@/components/UserNav";
import SideNav from "@/components/dashboard/Sidenav";
import Topnav from "@/components/dashboard/Topnav";
import Workspaces from "@/components/dashboard/Workspaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { MdOutlineNotifications } from "react-icons/md";

const Page = () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="w-full">
        <Tabs defaultValue="workspaces" className="">
          <TabsList className="flex justify-between border-b border-border h-24 w-full">
            <div className="h-full">
              <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </div>
            <div className="flex items-center pr-8">
              <div className="pr-4">
                <MdOutlineNotifications size={22} />
              </div>
              <UserNav />
            </div>
          </TabsList>
          <TabsContent value="workspaces">
            <Workspaces />
          </TabsContent>
          <TabsContent value="analytics">Analytics</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
