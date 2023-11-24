import React from "react";
import {
  MdOutlinePayment,
  MdOutlineNotifications,
  MdOutlineAnalytics,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Switch } from "../ui/switch";

const SideNav = () => {
  return (
    <div className="w-24 h-screen border-r border-border flex flex-col items-center">
      <div className="w-10 h-10 bg-secondary mt-6"></div>
      <div className="mt-12 text-text space-y-6 grow">
        <MdOutlinePayment size={22} />
        <MdOutlineAnalytics size={22} />
        <MdOutlineNotifications size={22} />
        <IoSettingsOutline size={22} />
      </div>
      <div className="mb-4">
        <Switch />
      </div>
    </div>
  );
};

export default SideNav;
