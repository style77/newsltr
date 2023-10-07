import Image from "next/image";
import React from "react";
import formDecor from "@/public/login-decor.svg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between h-screen min-h-[900px] w-full ">
      <div className="grow flex justify-center">{children}</div>
      <Image className="h-full w-fit" src={formDecor} alt="login-decor" />
    </div>
  );
};

export default Layout;
