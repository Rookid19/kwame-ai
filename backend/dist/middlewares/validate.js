"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddNotes = void 0;
const express_validator_1 = require("express-validator");
/**
 * Middleware to validate the request body when adding a new note.
 * Validates that the 'title' and 'body' fields are not empty.
 * Responds with a 400 status and validation errors if the validation fails.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
exports.validateAddNotes = [
    // Validate that the 'title' field is not empty.
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title cannot be empty'),
    // Validate that the 'body' field is not empty.
    (0, express_validator_1.body)('body').notEmpty().withMessage('Body cannot be empty'),
    // Check for validation errors.
    (req, res, next) => {
        // Get the validation errors.
        const errors = (0, express_validator_1.validationResult)(req);
        // If there are validation errors, respond with a 400 status and the errors.
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array(), type: "validation" });
        }
        // If there are no validation errors, proceed to the next middleware.
        next();
    },
];
