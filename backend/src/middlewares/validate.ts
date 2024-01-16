import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';



export const validateAddNotes = [
 
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('body').notEmpty().withMessage('Body cannot be empty'),

    // Check for validation errors
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];