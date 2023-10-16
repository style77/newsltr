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

  const authLinks = <div>auth links</div>;
  const guestLinks = <div>guest links</div>;

  return (
    <nav className="flex border-b border-red-300 justify-between py-2 px-4">
      <div>LOGO</div>
      <NavigationMenu>
        <div>{isUserAuthenticated ? authLinks : guestLinks}</div>
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
