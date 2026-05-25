import { Router } from "express";
import { getAllNotes, createNote, getNoteById } from "../controllers/notes";

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);

export default router;