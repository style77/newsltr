import React from "react";
import { useCurrentEditor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { ActionType, EditorButtonsType } from "./types";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

type AlignmentType = Omit<EditorButtonsType, "action">;

const alignmentData: AlignmentType[] = [
  {
    name: "left",
    icon: <AlignLeft strokeWidth={3} size={20} />,
  },
  {
    name: "center",
    icon: <AlignCenter strokeWidth={3} size={20} />,
  },
  {
    name: "right",
    icon: <AlignRight strokeWidth={3} size={20} />,
  },
  {
    name: "justify",
    icon: <AlignJustify strokeWidth={3} size={20} />,
  },
];

const AlignmentButtons = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const handleButtonClick = (option: string) => {
    return editor.chain().focus().setTextAlign(option).run();
  };

  const isActive = "bg-text text-white";

  return (
    <>
      {alignmentData.map(({ name, icon }) => (
        <Button
          key={name}
          variant="icon"
          size="icon"
          onClick={() => handleButtonClick(name)}
          className={editor.isActive(name) ? isActive : ""}
        >
          {icon}
        </Button>
      ))}
    </>
  );
};

export default AlignmentButtons;
