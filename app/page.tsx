/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import NoteCard from "@/components/NoteCard";
import NoteForm from "@/components/NoteForm";
import { useNotes } from "@/context/NoteContext";
import { useEffect } from "react";

export default function Home() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen mx-auto flex-col">
      <h1 className="text-3xl font-bold text-center text-white mb-5">
        Notes App
      </h1>
      <div>
        <NoteForm />
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
