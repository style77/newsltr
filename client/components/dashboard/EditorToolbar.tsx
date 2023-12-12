import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";

import { Button } from "../ui/button";

type ActionType = "toggleBold" | "toggleItalic" | "toggleUnderline";

const EditorToolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const handleButtonClick = (action: ActionType) => {
    return editor.chain().focus()[action]().run();
  };

  const isActive = "bg-black text-white";

  return (
    <div>
      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleBold")}
      >
        <Bold />
      </Button>

      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleItalic")}
        className={editor.isActive("italic") ? isActive : ""}
      >
        <Italic />
      </Button>

      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleUnderline")}
        className={editor.isActive("underline") ? isActive : ""}
      >
        <Underline />
      </Button>
    </div>
  );
};

export default EditorToolbar;
