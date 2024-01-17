import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import db from './config/db';
import notesRoute from './routes/notes'
import { errorProps, errorResponse } from './interface/interface';

// Create an Express application instance.
const app = express();

// MIDDLEWARES

// Parse incoming JSON requests.
app.use(bodyParser.json());

// Enable Cross-Origin Resource Sharing (CORS).
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Root route
app.get('/', (_, res, next) => {
    // Respond with a welcome message.
    res.send(`WELCOME KWAME AI`);
});

// Route for handling notes
app.use('/api/v1/notes', notesRoute);

// Error handler middleware
app.use((err: errorProps, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    // Prepare the error response object.
    let errorResponse: errorResponse = {
        error: {
            message: err.message,
            status: (err as any).statusCode || 500,
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
