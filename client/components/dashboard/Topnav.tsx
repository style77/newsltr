"use client";
import React from "react";
import TopnavLink from "./TopnavLink";
import UserNav from "../UserNav";
import { MdOutlineNotifications } from "react-icons/md";

const topNavItems = [
  { id: 1, label: "Workspaces", url: `/workspaces` },
  { id: 2, label: "Analytics", url: `/analytics` },
];

const Topnav = () => {
  return (
    <nav className="flex justify-between border-b border-border h-24 w-full">
      <ul className="flex pl-8 bp:flex-row xs:flex-col md:flex-wrap sm:flex-nowrap gap-x-4 text-text h-full">
        {topNavItems.map(({ id, url, label }) => (
          <TopnavLink key={id} href={`/dashboard${url}`}>
            {label}
          </TopnavLink>
        ))}
      </ul>

      <div className="flex items-center pr-8">
        <div className="pr-4">
          <MdOutlineNotifications size={22} />
        </div>
        <UserNav />
      </div>
    </nav>
  );
};

export default Topnav;
