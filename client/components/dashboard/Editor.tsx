"use client";
import React, { useContext } from "react";
import {
  EditorProvider,
  useEditor,
  EditorContent,
  EditorContext,
  Content,
  JSONContent,
  HTMLContent,
  Editor as EditorType,
  useCurrentEditor,
} from "@tiptap/react";
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

const Editor = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  // TODO: ADD TEMPLATE FORM INSIDE THE EDITOR PROVIDER

  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={
        <>
          <EditorToolbar />
          {/* {children} */}
        </>
      }
    >
      {children}
    </EditorProvider>
    // <>
    // <EditorToolbar editor={editor} />
    // <Input className="border-b border-border2" placeholder="Object" />
    // <EditorContent editor={editor} />
    // </>
  );
};

export default Editor;
