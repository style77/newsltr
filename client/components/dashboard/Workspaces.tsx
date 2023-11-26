"use client";
import React from "react";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/features/dialogSlice";
import { MdAdd } from "react-icons/md";

const Workspaces = () => {
  const dispatch = useAppDispatch();
  const handleDialogClick = () => {
    dispatch(onOpen());
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Button variant="icon" size="icon">
            <LayoutGrid size={18} />
          </Button>
          <Button variant="icon" size="icon">
            <AlignJustify size={20} />
          </Button>
        </div>
        <Button variant="dashboard" onClick={handleDialogClick}>
          <MdAdd className="mr-2" size={18} />
          Add workspace
        </Button>
      </div>
    </div>
  );
};

export default Workspaces;
