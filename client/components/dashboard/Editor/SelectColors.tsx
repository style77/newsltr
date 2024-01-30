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
import { Baseline } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

import { twColors } from "@/utils/tiptap/tailwinds-colors";
import { cn } from "@/lib/utils";

const SelectColors = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const [selectedColorObj] = twColors.flatMap((color) => {
    return color.swatches.filter((swatch) =>
      editor.isActive({ color: swatch.color }),
    );
  });

  const selectedColor = selectedColorObj?.color;

  return (
    <div>
      <Select
        value={selectedColor || "black"}
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
                      className={cn(
                        swatch.color === selectedColor
                          ? "border-2 border-black p-1"
                          : "",
                        "h-4 w-4 hover:opacity-80 cursor-pointer",
                      )}
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

export default SelectColors;
