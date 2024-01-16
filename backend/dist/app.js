"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const notes_1 = __importDefault(require("./routes/notes"));
const app = (0, express_1.default)();
// MIDDLEWARES
app.use(body_parser_1.default.json());
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Root route
app.get('/', (_, res, next) => {
    res.send(`WELCOME KWAME AI`);
});
// Get all notes
app.use('/api/v1/notes', notes_1.default);
// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Check if the error has a status code, otherwise default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
        },
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
