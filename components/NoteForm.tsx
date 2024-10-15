"use client";

import { useNotes } from "@/context/NoteContext";
import { useRef, useState } from "react";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { createNote } = useNotes();

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createNote({ title, content });

    setTitle("");
    setContent("");

    titleRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        type="text"
        name="title"
        placeholder="Title"
        autoFocus
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent my-2"
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />

      <input
        value={content}
        type="text"
        name="content"
        placeholder="Content"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent my-2"
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex flex-row justify-end mt-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Create
        </button>
      </div>
    </form>
  );
}
