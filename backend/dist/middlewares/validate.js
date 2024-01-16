"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddNotes = void 0;
const express_validator_1 = require("express-validator");
exports.validateAddNotes = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('body').notEmpty().withMessage('Body cannot be empty'),
    // Check for validation errors
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
