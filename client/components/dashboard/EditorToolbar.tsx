import React, { useEffect, useState, useCallback } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Separator } from "../ui/separator";
import FormattingButtons from "./Editor/FormattingButtons";
import UndoRedoButtons from "./Editor/UndoRedoButtons";
import SelectFont from "./Editor/SelectFont";
import SelectFontSize from "./Editor/SelectFontSize";
import SelectColors from "./Editor/SelectColors";
import AlignmentButtons from "./Editor/AlignmentButtons";
import ListButtons from "./Editor/ListButtons";
import AdditionalButtons from "./Editor/AdditionalButtons";

const EditorToolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-10">
      <UndoRedoButtons />
      <Separator orientation="vertical" className="mx-2" />
      <SelectFont />
      <Separator orientation="vertical" className="mx-2" />
      <SelectFontSize />
      <Separator orientation="vertical" className="mx-2" />
      <FormattingButtons />
      <Separator orientation="vertical" className="mx-2" />
      <SelectColors />
      <Separator orientation="vertical" />
      <AlignmentButtons />
      <ListButtons />
      <Separator orientation="vertical" />
      <AdditionalButtons />
    </div>
  );
};

export default EditorToolbar;
