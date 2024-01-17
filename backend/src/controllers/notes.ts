import { NextFunction, Request, Response } from "express";
import db from "../config/db";

/**
 * Middleware to get all notes from the database.
 * @param _ - Express Request object (unused).
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const getNotes = (_: Request, res: Response, next: NextFunction) => {
    const selectQuery = 'SELECT * FROM notes';

    // Execute the SELECT query to retrieve all notes.
    db.query(selectQuery, (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        } else {
            // Respond with the retrieved notes.
            res.status(200).json(result);
        }
    });
}

/**
 * Middleware to add a new note to the database.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const addNotes = (req: Request, res: Response, next: NextFunction) => {
    // Extract title and body from the request body.
    const { title, body } = req.body;

    // Define the INSERT query to add a new note.
    const insertQuery = 'INSERT INTO notes (title, body) VALUES (?, ?)';
    
    // Execute the INSERT query with sanitized parameters.
    db.query(insertQuery, [title.toUpperCase().trim(), body.trim()], (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        } else {
            // Respond with a success message and the result.
            res.status(201).json({ message: 'Note created successfully', result });
        }
    });
}

/**
 * Middleware to update an existing note in the database.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const updateNotes = (req: Request, res: Response, next: NextFunction) => {
    // Extract title, body, and id from the request body and parameters.
    const { title, body } = req.body;
    const { id } = req.params;

    // Define the UPDATE query to update an existing note.
    const updateQuery = 'UPDATE notes SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';

    // Execute the UPDATE query with sanitized parameters.
    db.query(updateQuery, [title.toUpperCase().trim(), body.trim(), id.trim()], (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        } else {
            // Respond with a success message and the result.
            res.status(200).json({ message: 'Note updated successfully', result });
        }
    });
}

/**
 * Middleware to delete a note from the database.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const deleteNotes = (req: Request, res: Response, next: NextFunction) => {
    // Extract id from the request parameters.
    const { id } = req.params;

    // Define the DELETE query to delete a note.
    const deleteQuery = 'DELETE FROM notes WHERE id = ?';

    // Execute the DELETE query with sanitized parameters.
    db.query(deleteQuery, [id.trim()], (err, result) => {
        if (err) {
            // Pass the error to the error-handling middleware.
            next(err);
        } else {
            // Respond with a success message and the result.
            res.status(200).json({ message: 'Note deleted successfully', result });
        }
    });
}
