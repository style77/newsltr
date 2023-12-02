import { createSlice } from "@reduxjs/toolkit";
import { DialogState } from "@/lib/types";

const workspaceDeletionDialogState: DialogState = {
  isOpen: false,
};

const workspaceDeletionDialogSlice = createSlice({
  name: "work space deletion dialog",
  initialState: workspaceDeletionDialogState,
  reducers: {
    openWorkspaceDeletion: (state) => {
      state.isOpen = true;
    },
    closeWorkspaceDeletion: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openWorkspaceDeletion, closeWorkspaceDeletion } =
  workspaceDeletionDialogSlice.actions;

export default workspaceDeletionDialogSlice.reducer;
