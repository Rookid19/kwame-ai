"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotes = void 0;
const db_1 = __importDefault(require("../config/db"));
const getNotes = (req, res, next) => {
    const selectQuery = 'SELECT * FROM notess';
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
