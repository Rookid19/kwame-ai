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

    const { title, body } = req.body;
    const insertQuery = 'INSERT INTO notes (title, body) VALUES (?, ?)';
    db.query(insertQuery, [title, body], (err, result) => {
        if (err) {
            next(err)
        } else {
            res.status(201).json({ message: 'Note created successfully', result });
        }
    });
}

export const updateNotes = (req: Request, res: Response, next: NextFunction) => {

}