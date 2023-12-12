import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkspaceEditForm from "./WorkspaceEditForm";
import { closeEditDialog } from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { WorkspaceResult } from "@/redux/features/workspaceApiSlice";

interface WorkspaceEditDialogPorps {
  workspace: WorkspaceResult;
}

const WorkspaceEditDialog = ({ workspace }: WorkspaceEditDialogPorps) => {
  const dispatch = useAppDispatch();
  const { isEditDialogOpen } = useAppSelector((state) => state.dialog);

  const handleCloseDialog = () => {
    dispatch(closeEditDialog());
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit workspace</DialogTitle>
          <DialogDescription>
            Fill the form below to edit the workspace.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceEditForm workspace={workspace} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceEditDialog;
