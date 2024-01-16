import { NextFunction, Request, Response } from "express";
import db from "../config/db";

export const getNotes = (_: Request, res: Response, next: NextFunction) => {
    const selectQuery = 'SELECT * FROM notes';

    db.query(selectQuery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
}

export const addNotes = (req: Request, res: Response, next: NextFunction) => {
    // title converted to uppercase
    const { title, body } = req.body;
    const insertQuery = 'INSERT INTO notes (title, body) VALUES (?, ?)';
    db.query(insertQuery, [title.toUpperCase(), body], (err, result) => {
        if (err) {
            next(err)
        } else {
            res.status(201).json({ message: 'Note created successfully', result });
        }
    });
}

export const updateNotes = (req: Request, res: Response, next: NextFunction) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const updateQuery = 'UPDATE notes SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.query(updateQuery, [title, body, id], (err, result) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({ message: 'Note updated successfully', result });
        }
    });
}

export const deleteNotes = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM notes WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({ message: 'Note deleted successfully', result });
        }
    });
}