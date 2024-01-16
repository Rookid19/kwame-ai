import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import db from './config/db';
import notesRoute from './routes/notes'
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
