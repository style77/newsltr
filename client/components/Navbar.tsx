"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { UserNav } from "./UserNav";
import { useAppSelector } from "@/redux/hooks";

const guestList = [
  {
    name: "Log in",
    url: "/login",
  },
  {
    name: "Sign up",
    url: "/register",
  },
];

const Navbar = () => {
  const { isUserAuthenticated } = useAppSelector((state) => state.auth);
  console.log(isUserAuthenticated);

  const guestLinks = (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink className="mr-3" href="login">
          Log in
        </NavigationMenuLink>
        <NavigationMenuLink
          className="border border-text p-2 rounded"
          href="register"
        >
          Sign up
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
  const authLinks = (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink href="dashboard">Dashboard</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <UserNav />
      </NavigationMenuItem>
    </>
  );

  return (
    <nav className="flex border-b border-red-300 justify-between py-8 px-4">
      <div className="h-6 w-6 bg-zinc-200" />
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          {isUserAuthenticated ? authLinks : guestLinks}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
