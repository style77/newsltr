import React, { useEffect, useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Undo2,
  Redo2,
  Strikethrough,
  Baseline,
} from "lucide-react";
import { ImFontSize } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Level } from "@tiptap/extension-heading";

import { twColors } from "../../utils/tiptap/tailwinds-colors.js";

type ActionType =
  | "toggleBold"
  | "toggleItalic"
  | "toggleUnderline"
  | "toggleStrike"
  | "undo"
  | "redo";

const fontList = [
  { label: "Arial", value: "Arial" },
  { label: "Comic Sans MS", value: "Comic Sans MS" },
  { label: "Georgia", value: "Georgia" },
];

const fontSizeList = ["10px", "13px", "18px", "32px"];

const colors = [
  { label: "bg-purple-500", value: "#a855f7" },
  { label: "bg-green-500", value: "#22c55e" },
  { label: "bg-red-500", value: "#ef4444" },
  { label: "bg-red-500", value: "#ef4444" },
  { label: "bg-red-500", value: "#ef4444" },
  { label: "bg-red-500", value: "#ef4444" },
];

const EditorToolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const handleButtonClick = (action: ActionType) => {
    return editor.chain().focus()[action]().run();
  };

  const handleHeadingsClick = (level: Level) => {
    return editor.chain().focus().toggleHeading({ level: level }).run();
  };

  const isActive = "bg-black text-white";
  const selectedFont = fontList.find((font) =>
    editor.isActive("textStyle", { fontFamily: font.value }),
  );

  const selectedFontSize = fontSizeList.find((fontSize) =>
    editor.isActive("textStyle", { fontSize: fontSize }),
  );

  // console.log(selectedFont);
  // console.log(selectedFontSize);

  return (
    <div className="flex h-10">
      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("undo")}
      >
        <Undo2 strokeWidth={3} size={20} />
      </Button>
      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("redo")}
      >
        <Redo2 strokeWidth={3} size={20} />
      </Button>
      <Separator orientation="vertical" className="mx-2" />
      <Select
        value={selectedFont?.value || "Arial"}
        onValueChange={(value) => {
          editor.chain().focus().setFontFamily(value).run();
          console.log(value);
        }}
      >
        <SelectTrigger className="w-[100px] border-transparent hover:bg-background2">
          <SelectValue placeholder="Arial" />
        </SelectTrigger>
        <SelectContent>
          {fontList.map(({ label, value }) => (
            <SelectItem key={label} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-2" />
      <Select
        value={selectedFontSize || "13px"}
        onValueChange={(value) => {
          editor.chain().focus().setFontSize(value).run();
          console.log(value);
        }}
      >
        <SelectTrigger className="w-[40px] p-0">
          <SelectValue placeholder="13">
            <ImFontSize size={18} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {fontSizeList.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-2" />
      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleBold")}
      >
        <Bold strokeWidth={3} size={20} />
      </Button>

      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleItalic")}
        className={editor.isActive("italic") ? isActive : ""}
      >
        <Italic strokeWidth={3} size={20} />
      </Button>

      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleUnderline")}
        className={cn(editor.isActive("underline") ? isActive : "", "mr-4")}
      >
        <Underline strokeWidth={3} size={20} />
      </Button>
      <Button
        variant="icon"
        size="icon"
        onClick={() => handleButtonClick("toggleStrike")}
        className={cn(editor.isActive("underline") ? isActive : "", "mr-4")}
      >
        <Strikethrough strokeWidth={3} size={20} />
      </Button>
      <Separator orientation="vertical" />

      <Select
        value={selectedFontSize || "13px"}
        onValueChange={(value) => {
          editor.chain().focus().setColor(value).run();
          console.log(value);
        }}
      >
        <SelectTrigger className="w-[40px] p-0">
          <SelectValue placeholder="13">
            <Baseline strokeWidth={3} size={20} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="p-1">
          {twColors.map((palette) => (
            <SelectGroup
              key={palette.paletteName}
              className="flex gap-1 mb-1 last:mb-0"
            >
              {palette.swatches.map((swatch) => {
                return (
                  <SelectItem
                    key={swatch.color}
                    className="w-4 h-4 p-0"
                    hidden
                    value={swatch.color}
                  >
                    <div
                      style={{ backgroundColor: `${swatch.color}` }}
                      className=" h-4 w-4"
                    ></div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EditorToolbar;
