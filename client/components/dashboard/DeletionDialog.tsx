import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { closeDeleteDialog } from "@/redux/features/dialogSlice";

interface DeletionDialogProps {
  deleteAction: () => Promise<void>;
  itemToBeDeleted: string;
}

const DeletionDialog = ({
  deleteAction,
  itemToBeDeleted,
}: DeletionDialogProps) => {
  const dispatch = useAppDispatch();
  const { isDeleteDialogOpen } = useAppSelector((state) => state.dialog);

  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={handleCloseDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {itemToBeDeleted} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={deleteAction}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletionDialog;
