import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

/**
 * Middleware to validate the request body when adding a new note.
 * Validates that the 'title' and 'body' fields are not empty.
 * Responds with a 400 status and validation errors if the validation fails.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const validateAddNotes = [

    // Validate that the 'title' field is not empty.
    body('title').notEmpty().withMessage('Title cannot be empty'),

    // Validate that the 'body' field is not empty.
    body('body').notEmpty().withMessage('Body cannot be empty'),

    // Check for validation errors.
    (req: Request, res: Response, next: NextFunction) => {
        // Get the validation errors.
        const errors = validationResult(req);

        // If there are validation errors, respond with a 400 status and the errors.
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array(), type: "validation" });
        }

        // If there are no validation errors, proceed to the next middleware.
        next();
    },
];
