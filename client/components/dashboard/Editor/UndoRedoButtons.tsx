import React from "react";
import { Editor, useCurrentEditor } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionType, EditorButtonsType } from "./types";

type UndoRedoType = Omit<EditorButtonsType, "actionFunction">;

const undoRedoData: UndoRedoType[] = [
  {
    name: "undo",
    action: "undo",
    icon: <Undo2 strokeWidth={3} size={20} />,
  },
  {
    name: "redo",
    action: "redo",
    icon: <Redo2 strokeWidth={3} size={20} />,
  },
];

const UndoRedoButtons = () => {
  const { editor } = useCurrentEditor();
  console.log(editor);
  if (!editor) {
    return null;
  }

  const handleButtonClick = (action: ActionType) => {
    return editor.chain().focus()[action]().run();
  };

  const isActive = "bg-text text-white";

  return (
    <>
      {undoRedoData.map(({ name, action, icon }) => (
        <Button
          key={name}
          variant="editor"
          size="icon"
          onClick={() => handleButtonClick(action)}
          className={editor.isActive(name) ? isActive : ""}
        >
          {icon}
        </Button>
      ))}
    </>
  );
};

export default UndoRedoButtons;
