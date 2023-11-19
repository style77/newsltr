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
import UserNav from "@/components/UserNav";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const { isUserAuthenticated } = useAppSelector((state) => state.auth);
  console.log(isUserAuthenticated);

  const guestLinks = (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink className="mr-3" href="login">
          Log in
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className="border border-text py-2 px-4 rounded"
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
    <nav className="flex max-w-6xl mx-auto justify-between py-8 px-4">
      <div className="h-6 w-6 bg-zinc-200" />
      <NavigationMenu>
        <NavigationMenuList className="space-x-8">
          {isUserAuthenticated ? authLinks : guestLinks}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
