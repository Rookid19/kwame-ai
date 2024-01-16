"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotes = exports.updateNotes = exports.addNotes = exports.getNotes = void 0;
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
    // title converted to uppercase
    const { title, body } = req.body;
    const insertQuery = 'INSERT INTO notes (title, body) VALUES (?, ?)';
    db_1.default.query(insertQuery, [title.toUpperCase(), body], (err, result) => {
        if (err) {
            next(err);
        }
        else {
            res.status(201).json({ message: 'Note created successfully', result });
        }
    });
};
exports.addNotes = addNotes;
const updateNotes = (req, res, next) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const updateQuery = 'UPDATE notes SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db_1.default.query(updateQuery, [title, body, id], (err, result) => {
        if (err) {
            next(err);
        }
        else {
            res.status(200).json({ message: 'Note updated successfully', result });
        }
    });
};
exports.updateNotes = updateNotes;
const deleteNotes = (req, res, next) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM notes WHERE id = ?';
    db_1.default.query(deleteQuery, [id], (err, result) => {
        if (err) {
            next(err);
        }
        else {
            res.status(200).json({ message: 'Note deleted successfully', result });
        }
    });
};
exports.deleteNotes = deleteNotes;
