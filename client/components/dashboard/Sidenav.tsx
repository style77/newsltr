import React from "react";
import { Settings, Bell, BarChart4, CreditCard } from "lucide-react";
import { Switch } from "../ui/switch";

const SideNav = () => {
  return (
    <div className="w-24 h-screen border-r border-border flex flex-col items-center">
      <div className="w-10 h-10 bg-secondary mt-6"></div>
      <div className="mt-12 text-text space-y-7 grow">
        <div className="hover:bg-background2 p-3 rounded-md">
          <CreditCard size={22} />
        </div>
        <div className="hover:bg-background2 p-3">
          <BarChart4 size={22} />
        </div>
        <div className="hover:bg-background2 p-3">
          <Bell size={22} />
        </div>
        <div className="hover:bg-background2 p-3">
          <Settings size={22} />
        </div>
      </div>
      <div className="mb-4">
        <Switch />
      </div>
    </div>
  );
};

export default SideNav;
