export interface Note {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;
