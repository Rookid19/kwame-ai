import express from 'express';
import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();


// Root route
app.get('/', (_, res, next) => {
    res.send('WELCOME KWAME AI');
});

// "Route not found" handler
app.all('*', (_, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

// CLUSTERING
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master process is running with process ID ${process.pid}`);

    // Fork worker processes
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle process termination
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`
        );
        console.log('Forking a new worker process...');
        cluster.fork();
    });
} else {
    const port = process.env.PORT || 3003;
    app.listen(port, () => {
        console.log(`Worker process ${process.pid} listening on port ${port}`);
    });
}
