import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Note } from '../types/note';

let notes: Note[] = [];

export const getAllNotes = (req: Request, res: Response) => {
  res.json(notes);
};

export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: 'Both "title" and "content" are required',
    });
  }

  const newNote: Note = {
    id: randomUUID(),
    title,
    content,
    createdAt: new Date(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

export const getNoteById = (req: Request, res: Response) => {
  const { id } = req.params;

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
}