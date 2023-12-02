import { createSlice } from "@reduxjs/toolkit";
import { DialogState } from "@/lib/types";

const subscriptionDialogInitialState: DialogState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState: subscriptionDialogInitialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = dialogSlice.actions;
export default dialogSlice.reducer;
