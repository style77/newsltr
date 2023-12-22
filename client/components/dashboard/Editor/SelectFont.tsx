import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentEditor } from "@tiptap/react";

const fontList = [
  { label: "Arial", value: "Arial" },
  { label: "Comic Sans MS", value: "Comic Sans MS" },
  { label: "Georgia", value: "Georgia" },
];

const SelectFont = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const selectedFont = fontList.find((font) =>
    editor.isActive("textStyle", { fontFamily: font.value }),
  );

  return (
    <div>
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
    </div>
  );
};

export default SelectFont;
