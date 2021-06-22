import express from 'express';

import {notesController} from '../controller/notesController.js';

const router = express.Router();

// GET request for retrieving all notes
router.get('/sortby/:sortby', notesController.getAllNotes.bind(notesController));

// GET request for retrieving specific note
router.get('/:id/', notesController.getNoteById.bind(notesController));

// PUT request for updating specific Note
router.put('/:id/', notesController.updateNoteById.bind(notesController));

// POST request for creating note
router.post('/', notesController.createNote.bind(notesController));

// DELETE request to delete a note
router.delete('/:id/', notesController.deleteNoteById.bind(notesController));

// export to use in notesController
export const notesRoutes = router;
