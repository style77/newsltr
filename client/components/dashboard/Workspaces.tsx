"use client";
import React from "react";
import { AlignJustify, LayoutGrid, MoreVertical, Users } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { openCreateDialog } from "@/redux/features/dialogSlice";
import { MdAdd } from "react-icons/md";
import SubscriptionDialog from "./SubscriptionDialog";
import WorkspaceCreationDialog from "./WorkspaceCreationDialog";
import { useRetrieveUserSubscriptionsQuery } from "@/redux/features/paymentApiSlice";
import { useRetriveWorkspacesQuery } from "@/redux/features/workspaceApiSlice";
import { useRouter } from "next/navigation";
import WorkspaceCard from "./WorkspaceCard";

const Workspaces = () => {
  const dispatch = useAppDispatch();
  const {
    data: userSubscriptions,
    isLoading,
    isSuccess,
  } = useRetrieveUserSubscriptionsQuery();

  const { data: workspaces, isLoading: worspacesLoading } =
    useRetriveWorkspacesQuery();

  const handleDialogClick = () => {
    dispatch(openCreateDialog());
  };

  if (isLoading) {
    return <div className="h-full">Loading...</div>;
  }
  console.log(userSubscriptions);

  const isUserSubscribed =
    isSuccess && userSubscriptions[0].status === "active";

  return (
    <div>
      {!isUserSubscribed ? <SubscriptionDialog /> : <WorkspaceCreationDialog />}
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
      <div className="mt-4">
        {workspaces?.results.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </div>
  );
};

export default Workspaces;
