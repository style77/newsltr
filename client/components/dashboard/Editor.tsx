"use client";
import React from "react";
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useEditor,
} from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";

const extensions = [StarterKit, Underline];

const content = "<p>Hello World!</p>";

const Editor = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<EditorToolbar />}
      slotAfter={<p>footer</p>}
    >
      <FloatingMenu>This is the floating menu</FloatingMenu>
      <BubbleMenu>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  );
};

export default Editor;
