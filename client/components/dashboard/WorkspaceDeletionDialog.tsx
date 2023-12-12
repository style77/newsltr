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
import { buttonVariants } from "../ui/button";
import { useDeleteWorkspaceMutation } from "@/redux/features/workspaceApiSlice";
import { cn } from "@/lib/utils";
import { closeDeleteDialog } from "@/redux/features/dialogSlice";

interface WorkspaceDeletionDialogProps {
  id: string;
}

const WorkspaceDeletionDialog = ({ id }: WorkspaceDeletionDialogProps) => {
  const dispatch = useAppDispatch();
  const { isDeleteDialogOpen } = useAppSelector((state) => state.dialog);

  const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();

  const handleDeleteWorkspace = async () => {
    try {
      await deleteWorkspace({ id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={handleCloseDialog}>
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
