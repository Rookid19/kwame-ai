"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotes = exports.getNotes = void 0;
const db_1 = __importDefault(require("../config/db"));
const getNotes = (_, res, next) => {
    const selectQuery = 'SELECT * FROM notes';
    db_1.default.query(selectQuery, (err, result) => {
        if (err) {
            next(err);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.getNotes = getNotes;
const addNotes = (req, res, next) => {
    const { title, body } = req.body;
    const insertQuery = 'INSERT INTO notes (title, body) VALUES (?, ?)';
    db_1.default.query(insertQuery, [title, body], (err, result) => {
        if (err) {
            next(err);
        }
        else {
            res.status(201).json({ message: 'Note created successfully' });
        }
    });
};
exports.addNotes = addNotes;
