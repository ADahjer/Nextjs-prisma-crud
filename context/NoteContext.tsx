"use client";

import { CreateNote } from "@/models/note.model";
import { Note } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async () => {},
  deleteNote: async () => {},
});

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = async () => {
    const res = await fetch("http://localhost:3000/api/notes");
    const notes: Note[] = await res.json();
    setNotes(notes);
  };

  const createNote = async (note: CreateNote) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await res.json();

    setNotes([...notes, data]);
  };

  const deleteNote = async (id: number) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete note");
    }

    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
