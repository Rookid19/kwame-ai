"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../controllers/notes");
const validate_1 = require("../middlewares/validate");
// Create an Express router instance.
const router = (0, express_1.Router)();
/**
 * Route to get all notes.
 */
router.get('/all', notes_1.getNotes);
/**
 * Route to add a new note.
 * Uses the `validateAddNotes` middleware to validate the request body.
 */
router.post('/add', validate_1.validateAddNotes, notes_1.addNotes);
/**
 * Route to update an existing note.
 * Uses the `validateAddNotes` middleware to validate the request body.
 */
router.put('/modify/:id', validate_1.validateAddNotes, notes_1.updateNotes);
/**
 * Route to delete a note.
 */
router.delete('/delete/:id', notes_1.deleteNotes);
// Export the router for use in other parts of the application.
exports.default = router;
