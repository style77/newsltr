import { createSlice } from "@reduxjs/toolkit";
import { WorkspaceDialogState } from "@/lib/types";

const initialState: WorkspaceDialogState = {
  isSubscriptionDialogOpen: false,
  isCreateDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openSubscriptionDialog: (state) => {
      state.isSubscriptionDialogOpen = true;
    },
    closeSubscriptionDialog: (state) => {
      state.isSubscriptionDialogOpen = false;
    },
    openCreateDialog: (state) => {
      state.isCreateDialogOpen = true;
    },
    closeCreateDialog: (state) => {
      state.isCreateDialogOpen = false;
    },
    openEditDialog: (state) => {
      state.isEditDialogOpen = true;
    },
    closeEditDialog: (state) => {
      state.isEditDialogOpen = false;
    },
    openDeleteDialog: (state) => {
      state.isDeleteDialogOpen = true;
    },
    closeDeleteDialog: (state) => {
      state.isDeleteDialogOpen = false;
    },
  },
});

export const {
  openSubscriptionDialog,
  closeSubscriptionDialog,
  openCreateDialog,
  closeCreateDialog,
  openEditDialog,
  closeEditDialog,
  openDeleteDialog,
  closeDeleteDialog,
} = dialogSlice.actions;
export default dialogSlice.reducer;
