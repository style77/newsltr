import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeWorkspaceDeletion } from "@/redux/features/workspaceDeletionDialogSlice";
import { Button, buttonVariants } from "../ui/button";
import { useDeleteWorkspaceMutation } from "@/redux/features/workspaceApiSlice";
import { cn } from "@/lib/utils";

interface WorkspaceDeletionDialogProps {
  // handleDeleteWorkspace: (id: string) => void;
  id: string;
}

const WorkspaceDeletionDialog = ({ id }: WorkspaceDeletionDialogProps) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.workspaceDeletionDialog);

  const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();

  const handleDeleteWorkspace = async () => {
    try {
      await deleteWorkspace({ id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    dispatch(closeWorkspaceDeletion());
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handleCloseDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workspace and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDeleteWorkspace}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WorkspaceDeletionDialog;
