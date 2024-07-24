"use client";

import { useEffect, useState } from "react";
import type { Snippets } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { editSnippet } from "@/actions";

interface ISnippetEditForm {
  snippet: Snippets;
}

const SnippetEditForm = ({ snippet }: ISnippetEditForm) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(snippet.code);
  }, [snippet.code]);

  const handleEditorChange = (value: string = "") => setCode(value);

  const editActionSnippet = editSnippet.bind(null, snippet.id, code);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editActionSnippet();
  };

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />

      <form onSubmit={handleSubmit}>
        <button className="border rounded p-2 m-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
