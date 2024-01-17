"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotes = exports.updateNotes = exports.addNotes = exports.getNotes = void 0;
const db_1 = __importDefault(require("../config/db"));
/**
 * Middleware to get all notes from the database.
 * @param _ - Express Request object (unused).
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
const getNotes = (_, res, next) => {
    const selectQuery = 'SELECT * FROM notes';
    // Execute the SELECT query to retrieve all notes.
    db_1.default.query(selectQuery, (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        }
        else {
            // Respond with the retrieved notes.
            res.status(200).json(result);
        }
    });
};
exports.getNotes = getNotes;
/**
 * Middleware to add a new note to the database.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
const addNotes = (req, res, next) => {
    // Extract title and body from the request body.
    const { title, body } = req.body;
    // Define the INSERT query to add a new note.
    const insertQuery = 'INSERT INTO notes (title, body) VALUES (?, ?)';
    // Execute the INSERT query with sanitized parameters.
    db_1.default.query(insertQuery, [title.toUpperCase().trim(), body.trim()], (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        }
        else {
            // Respond with a success message and the result.
            res.status(201).json({ message: 'Note created successfully', result });
        }
    });
};
exports.addNotes = addNotes;
/**
 * Middleware to update an existing note in the database.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
const updateNotes = (req, res, next) => {
    // Extract title, body, and id from the request body and parameters.
    const { title, body } = req.body;
    const { id } = req.params;
    // Define the UPDATE query to update an existing note.
    const updateQuery = 'UPDATE notes SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    // Execute the UPDATE query with sanitized parameters.
    db_1.default.query(updateQuery, [title.toUpperCase().trim(), body.trim(), id.trim()], (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        }
        else {
            // Respond with a success message and the result.
            res.status(200).json({ message: 'Note updated successfully', result });
        }
    });
};
exports.updateNotes = updateNotes;
/**
 * Middleware to delete a note from the database.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
const deleteNotes = (req, res, next) => {
    // Extract id from the request parameters.
    const { id } = req.params;
    // Define the DELETE query to delete a note.
    const deleteQuery = 'DELETE FROM notes WHERE id = ?';
    // Execute the DELETE query with sanitized parameters.
    db_1.default.query(deleteQuery, [id.trim()], (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        }
        else {
            // Respond with a success message and the result.
            res.status(200).json({ message: 'Note deleted successfully', result });
        }
    });
};
exports.deleteNotes = deleteNotes;
