import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import db from './config/db';
import notesRoute from './routes/notes'
import { errorProps, errorResponse } from './interface/interface';
const app = express();


// MIDDLEWARES
app.use(bodyParser.json());
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
    res.send(`WELCOME KWAME AI`);
});

// Get all notes
app.use('/api/v1/notes', notesRoute);

// Error handler middleware

app.use((err: errorProps, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    let errorResponse: errorResponse = {
        error: {
            message: err.message,
            status: (err as any).statusCode || 500,
        },
    };

    if (err.code === 'ER_DUP_ENTRY') {
        // If the error code is a duplicate entry error, update the errorResponse
        errorResponse.error.message = 'Note title already exists';
        errorResponse.error.status = 400;
    }

    res.status(errorResponse.error.status).json(errorResponse);
});


// "Route not found" handler
app.all('*', (_, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Worker process ${process.pid} listening on port ${port}`);
});
