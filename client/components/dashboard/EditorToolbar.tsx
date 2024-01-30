import React, { useContext, useEffect, useState, useCallback } from "react";
import { Editor, useCurrentEditor, EditorContext } from "@tiptap/react";
import { Separator } from "../ui/separator";
import FormattingButtons from "./Editor/FormattingButtons";
import UndoRedoButtons from "./Editor/UndoRedoButtons";
import SelectFont from "./Editor/SelectFont";
import SelectFontSize from "./Editor/SelectFontSize";
import SelectColors from "./Editor/SelectColors";
import AlignmentButtons from "./Editor/AlignmentButtons";
import ListButtons from "./Editor/ListButtons";
import AdditionalButtons from "./Editor/AdditionalButtons";

interface EditorToolbarPropsType {
  editor: Editor | null;
}

const EditorToolbar = () => {
  const { editor } = useCurrentEditor();
  //

  if (!editor) {
    return null;
  }

  console.log(editor.getHTML());

  return (
    <div className="flex border-b h-14 border-border p-2">
      <UndoRedoButtons />
      <Separator orientation="vertical" className="mx-2" />
      <SelectFont />
      <Separator orientation="vertical" className="mx-2" />
      <SelectFontSize />
      <Separator orientation="vertical" className="mx-2" />
      <FormattingButtons />
      <Separator orientation="vertical" className="mx-2" />
      <SelectColors />
      <Separator orientation="vertical" className="mx-2" />
      <AlignmentButtons />
      <Separator orientation="vertical" className="mx-2" />
      <ListButtons />
      <Separator orientation="vertical" className="mx-2" />
      <AdditionalButtons />
    </div>
  );
};

export default EditorToolbar;
