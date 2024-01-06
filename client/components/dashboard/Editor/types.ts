import React from "react";

export type ActionType =
  | "toggleBold"
  | "toggleItalic"
  | "toggleUnderline"
  | "toggleStrike"
  | "undo"
  | "redo"
  | "toggleOrderedList"
  | "toggleBulletList";

export type EditorButtonsType = {
  name: string;
  action: ActionType;
  actionFunction: () => void;
  icon: React.ReactNode;
};
