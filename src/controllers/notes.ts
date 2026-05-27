import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Note } from '../types/note';
import { NotFoundError } from '../errors/index.js';

let notes: Note[] = [];

export const getAllNotes = (req: Request, res: Response) => {
  res.json(notes);
};

export const getNoteById = (req: Request, res: Response) => {
  const { id } = req.params;

  const note = notes.find((n) => n.id === id);

  if (!note) {
    throw new NotFoundError('Note not found');
  }

  res.json(note);
}

export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newNote: Note = {
    id: randomUUID(),
    title,
    content,
    createdAt: new Date(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

export const updateNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex === -1) {
    throw new NotFoundError('Note not found');
  }

  const update = req.body;

  const updatedNote = {
    ...notes[noteIndex],
    ...update,
  };

  notes[noteIndex] = updatedNote;
  res.json(updatedNote);
};

export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex === -1) {
    throw new NotFoundError('Note not found');
  }

  notes.splice(noteIndex, 1);
  res.status(204).send();
};