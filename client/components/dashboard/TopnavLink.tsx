"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopnavLinkProps {
  href: string;
  // children: React.ReactNode;
  children: string;
}

const TopnavLink = ({ href, children }: TopnavLinkProps) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <li
      className={`h-full border-b-4 hover:bg-background2 ${
        active ? " border-text font-bold" : "border-transparent"
      }`}
    >
      <Link className="h-full align-middle flex items-center" href={href}>
        {children}
      </Link>
    </li>
  );
};

export default TopnavLink;
