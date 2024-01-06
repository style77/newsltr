import React from "react";
import { useCurrentEditor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { ActionType, EditorButtonsType } from "./types";
import { List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

type ListType = Omit<EditorButtonsType, "actionFunction">;

const listData: ListType[] = [
  {
    name: "orderedList",
    action: "toggleOrderedList",
    icon: <ListOrdered strokeWidth={3} size={20} />,
  },
  {
    name: "bulletList",
    action: "toggleBulletList",
    icon: <List strokeWidth={3} size={20} />,
  },
];

const ListButtons = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const handleButtonClick = (action: ActionType) => {
    return editor.chain().focus()[action]().run();
  };

  const isActive = "bg-text text-white";

  return (
    <>
      {listData.map(({ name, action, icon }) => (
        <Button
          key={name}
          variant="editor"
          size="icon"
          onClick={() => handleButtonClick(action)}
          className={cn(editor.isActive(name) ? isActive : "", "mr-1")}
        >
          {icon}
        </Button>
      ))}
    </>
  );
};

export default ListButtons;
