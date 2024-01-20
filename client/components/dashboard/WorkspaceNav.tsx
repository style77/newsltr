"use client";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type WorkspaceNav = {
  workspaceId: string;
};

const WorkspaceNav = ({ workspaceId }: WorkspaceNav) => {
  const router = useRouter();
  const pathname = usePathname();
  const p = useParams();
  console.log(p);
  const baseUrl = `/dashboard/workspaces/${workspaceId}/`;

  const workspaceNavItems = [
    { id: 1, label: "Campaign", url: `campaign` },
    { id: 2, label: "Templates", url: `templates` },
    { id: 3, label: "Subscribers", url: `subscribers` },
    { id: 4, label: "Members", url: `members` },
  ];

  function checkLastRouteMatch(pathname: string, givenString: string) {
    const parts = pathname.split("/");

    const lastPart = parts[parts.length - 1];

    return lastPart === givenString;
  }

  return (
    <nav className="inline-block p-0 bg-sky-50 border border-border rounded-lg overflow-hidden mb-8">
      <ul className="flex items-center">
        {workspaceNavItems.map(({ id, label, url }) => (
          <li
            className={cn(
              "text-sm cursor-pointer px-3 py-1.5",
              checkLastRouteMatch(pathname, url)
                ? "font-bold border-b-4 border-text"
                : "",
            )}
            key={id}
            onClick={() => router.push(`${baseUrl}/${url}`)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default WorkspaceNav;
