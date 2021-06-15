import express from 'express';

// Require controller modules.
import {notesController} from '../controller/notesController.js';

const router = express.Router();

// GET request for retrieving all Notes
router.get('/', notesController.getAllNotes.bind(notesController));

// GET request for retrieving specific Note
router.get('/:id/', notesController.getNoteById.bind(notesController));

// PUT request for retrieving specific Note
// router.put('/:id/', notesController.getNoteById.bind(notesController));

// POST request for creating Note
router.post('/', notesController.createNote.bind(notesController));

// DELETE request to delete a Note
router.delete('/:id/', notesController.deleteNoteById.bind(notesController));

// export to use in notesController
export const notesRoutes = router;
