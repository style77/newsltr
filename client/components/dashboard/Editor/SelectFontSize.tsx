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
import { ImFontSize } from "react-icons/im";

const SelectFontSize = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const fontSizeList = ["10px", "13px", "18px", "32px"];
  const selectedFontSize = fontSizeList.find((fontSize) =>
    editor.isActive("textStyle", { fontSize: fontSize }),
  );

  return (
    <div>
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
    </div>
  );
};

export default SelectFontSize;
