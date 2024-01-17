import { Router } from 'express';
import { addNotes, deleteNotes, getNotes, updateNotes } from '../controllers/notes';
import { validateAddNotes } from '../middlewares/validate';

// Create an Express router instance.
const router = Router();

/**
 * Route to get all notes.
 */
router.get('/all', getNotes);

/**
 * Route to add a new note.
 * Uses the `validateAddNotes` middleware to validate the request body.
 */
router.post('/add', validateAddNotes, addNotes);

/**
 * Route to update an existing note.
 * Uses the `validateAddNotes` middleware to validate the request body.
 */
router.put('/modify/:id', validateAddNotes, updateNotes);

/**
 * Route to delete a note.
 */
router.delete('/delete/:id', deleteNotes);

// Export the router for use in other parts of the application.
export default router;
