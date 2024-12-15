import React from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode }) => {
  return (
    <Editor
      height="300px"
      defaultLanguage={language}
      value={code}
      onChange={(value) => setCode(value)}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
};

export default CodeEditor;
