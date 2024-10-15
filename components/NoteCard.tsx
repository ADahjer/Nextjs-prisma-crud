"use client";

import { useNotes } from "@/context/NoteContext";
import { Note } from "@/models/note.model";
import { FaPen as PenIcon, FaTrash as TrashIcon } from "react-icons/fa";

export default function NoteCard({ note }: { note: Note }) {
  const { deleteNote } = useNotes();

  return (
    <div
      key={note.id}
      className="mt-4 bg-slate-400 p-4 rounded-md flex flex-row justify-between items-center"
    >
      <div>
        <h2 className="text-xl font-bold">{note.title}</h2>
        <p>{note.content}</p>
        <p className="text-sm font-light mt-1">
          {new Date(note.updatedAt).toLocaleString()}
        </p>
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-full">
          <PenIcon className="w-4 h-4" />
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          onClick={async () => await deleteNote(note.id)}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
