"use client";
import React from "react";
import { EditorProvider } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import EditorToolbar from "./EditorToolbar";
import { FontSize } from "@/utils/tiptap/font-size";
import { Input } from "../ui/input";

const extensions = [
  StarterKit,
  FontFamily,
  FontSize,
  TextStyle,
  Underline,
  Color,
  Link,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  ListItem,
  OrderedList,
  BulletList,
  Image,
  Dropcursor,
];

const content = "<p>Hello World!</p>";

const Editor = () => {
  // const editor = useEditor({
  //   extensions,
  //   content,
  // });
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={
        <>
          <EditorToolbar />
          <Input className="p-4 border-b border-border " placeholder="Object" />
        </>
      }
    />
  );
};

export default Editor;
