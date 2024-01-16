import { NextFunction, Request, Response } from "express";
import db from "../config/db";

export const getNotes = (req: Request, res: Response, next: NextFunction) => {
    const selectQuery = 'SELECT * FROM notess';
    
    db.query(selectQuery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
}