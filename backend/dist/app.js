"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const notes_1 = __importDefault(require("./routes/notes"));
// Create an Express application instance.
const app = (0, express_1.default)();
// MIDDLEWARES
// Parse incoming JSON requests.
app.use(body_parser_1.default.json());
// Enable Cross-Origin Resource Sharing (CORS).
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Root route
app.get('/', (_, res, next) => {
    // Respond with a welcome message.
    res.send(`WELCOME KWAME AI`);
});
// Route for handling notes
app.use('/api/v1/notes', notes_1.default);
// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    // Prepare the error response object.
    let errorResponse = {
        error: {
            message: err.message,
            status: err.statusCode || 500,
        },
    };
    // Customize error response for duplicate entry errors.
    if (err.code === 'ER_DUP_ENTRY') {
        errorResponse.error.message = 'Note title already exists';
        errorResponse.error.status = 400;
    }
    // Respond with the error details.
    res.status(errorResponse.error.status).json(errorResponse);
});
// "Route not found" handler
app.all('*', (_, res) => {
    // Respond with a 404 Not Found error.
    res.status(404).json({ error: '404 Not Found' });
});
// Set up the application to listen on a specified port.
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Worker process ${process.pid} listening on port ${port}`);
});
