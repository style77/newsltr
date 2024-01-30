import { useContext } from "react";

import {
  EditorProvider,
  useEditor,
  EditorContent,
  EditorContext,
} from "@tiptap/react";

export const useEditorContext = (content: string) => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
