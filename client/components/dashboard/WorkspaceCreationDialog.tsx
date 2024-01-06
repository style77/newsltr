import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkspaceCreationForm from "./WorkspaceCreationForm";
import { closeCreateDialog } from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const WorkspaceCreationDialog = () => {
  const dispatch = useAppDispatch();
  const { isCreateDialogOpen } = useAppSelector((state) => state.dialog);

  const handleCloseDialog = () => {
    dispatch(closeCreateDialog());
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Fill the form below to create a workspace.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceCreationForm />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceCreationDialog;
