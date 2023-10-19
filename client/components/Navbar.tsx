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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";

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

const authList = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "Sig",
    url: "/register",
  },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isUserAuthenticated } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(setLogout());
    } finally {
      router.push("/");
    }
  };
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
        <NavigationMenuTrigger>
          <div className="h-8 w-8 bg-secondary rounded-full"></div>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );

  return (
    <nav className="flex border-b border-red-300 justify-between py-8 px-4">
      <div className="h-6 w-6 bg-zinc-200" />
      <NavigationMenu>
        <NavigationMenuList>
          {isUserAuthenticated ? authLinks : guestLinks}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
