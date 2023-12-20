"use client";
import React from "react";
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import EditorToolbar from "./EditorToolbar";
import { FontSize } from "@/utils/tiptap/font-size";

const extensions = [
  StarterKit,
  FontFamily,
  FontSize,
  TextStyle,
  Underline,
  Color,
  Heading.configure({
    levels: [1, 2, 3],
  }),
];

const content = "<p>Hello World!</p>";

const Editor = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<EditorToolbar />}
      slotAfter={<p>footer</p>}
    />
  );
};

export default Editor;
