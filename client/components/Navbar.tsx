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

const listItems = [
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
  return (
    <nav className="flex border-b border-red-200 justify-between py-2 px-4">
      <div>LOGO</div>
      <NavigationMenu>
        <NavigationMenuList>
          {listItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink href={item.url}>
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
