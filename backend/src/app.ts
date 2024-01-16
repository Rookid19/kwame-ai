import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import db from './config/db';

const app = express();

// Root route
app.get('/', (_, res, next) => {
    res.send(`WELCOME KWAME AI`);
});

// Get all notes
app.get('/notes', (req, res) => {
    const selectQuery = 'SELECT * FROM notes';
    db.query(selectQuery, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching notes' });
        } else {
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
