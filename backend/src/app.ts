import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import db from './config/db';
import notesRoute from './routes/notes'
import { errorProps } from './interface/interface';
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
    console.error(err.stack);

    // Check if the error has a status code, otherwise default to 500 (Internal Server Error)
    const statusCode = (err as any).statusCode || 500;

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
