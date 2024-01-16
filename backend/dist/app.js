"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
// Root route
app.get('/', (_, res, next) => {
    res.send(`WELCOME KWAME AI`);
});
// Get all notes
app.get('/notes', (req, res) => {
    const selectQuery = 'SELECT * FROM notes';
    db_1.default.query(selectQuery, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching notes' });
        }
        else {
            res.status(200).json(result);
        }
    });
});
// "Route not found" handler
app.all('*', (_, res) => {
    res.status(404).json({ error: '404 Not Found' });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Worker process ${process.pid} listening on port ${port}`);
});
