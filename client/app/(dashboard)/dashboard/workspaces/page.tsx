import React from "react";
import { MdAdd } from "react-icons/md";
import { LayoutGrid, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionDialog from "@/components/dashboard/SubscriptionDialog";

const page = () => {
  return (
    <div className="grow">
      <div className="w-[1480px] bg-background2 h-full p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <Button variant="icon" size="icon">
              <LayoutGrid size={18} />
            </Button>
            <Button variant="icon" size="icon">
              <AlignJustify size={20} />
            </Button>
          </div>
          <SubscriptionDialog />
        </div>
      </div>
    </div>
  );
};

export default page;
