import React, { useCallback } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Code, Image, Link, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditorButtonsType } from "./types";
import { cn } from "@/lib/utils";

type AdditionalButtonsType = Omit<EditorButtonsType, "action">;

const AdditionalButtons = () => {
  const { editor } = useCurrentEditor();

  const addImage = useCallback(() => {
    if (!editor) {
      return null;
    }
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const additionalData: AdditionalButtonsType[] = [
    {
      name: "image",
      actionFunction: addImage,
      icon: <Image strokeWidth={3} size={20} />,
    },
    {
      name: "link",
      actionFunction: setLink,
      icon: <Link strokeWidth={3} size={20} />,
    },
    {
      name: "code",
      actionFunction: () => editor.chain().focus().toggleCode().run(),
      icon: <Code strokeWidth={3} size={20} />,
    },
    {
      name: "attachment",
      actionFunction: () => {
        return;
      },
      icon: <Paperclip strokeWidth={3} size={20} />,
    },
  ];

  const isActive = "bg-text text-white";

  return (
    <>
      {additionalData.map(({ name, actionFunction, icon }) => (
        <Button
          key={name}
          variant="editor"
          size="icon"
          onClick={actionFunction}
          className={cn(editor.isActive(name) ? isActive : "", "mr-1")}
        >
          {icon}
        </Button>
      ))}
    </>
  );
};

export default AdditionalButtons;
