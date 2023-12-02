import React from "react";
import { MoreVertical, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  WorkspaceResult,
  useDeleteWorkspaceMutation,
} from "@/redux/features/workspaceApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { openWorkspaceDeletion } from "@/redux/features/workspaceDeletionDialogSlice";
import WorkspaceCreationForm from "./WorkspaceCreationForm";
import WorkspaceDeletionDialog from "./WorkspaceDeletionDialog";

interface WorkspaceCardProps {
  workspace: WorkspaceResult;
}

const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const openWorkspace = (id: string) => {
    router.push(`workspaces/${id}`);
  };

  const openWorkspaceDeletionDialog = () => {
    dispatch(openWorkspaceDeletion());
  };

  return (
    <div>
      <WorkspaceDeletionDialog id={workspace.id} />
      <div className="bg-background border border-border w-[500px] h-80 p-6 rounded-md">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">{workspace.name}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-sm hover:bg-background2">
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>My Workspace</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onClick={() => openWorkspace(workspace.id)}>
                Open
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={openWorkspaceDeletionDialog}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p>{workspace.description}</p>
        <div className="rounded-md border border-border p-4 mt-6 bg-background2">
          <div className="flex justify-between mb-2">
            <span>Subscriptions</span>
            <Users />
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-2xl">2986</span>
            <span className="text-sm self-center">+12% from last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
