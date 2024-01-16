import express from 'express';
import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();

const numCPUs = os.cpus().length;

// Root route
app.get('/', (_, res, next) => {
    res.send(`WELCOME KWAME AI ${numCPUs}`);
});

// "Route not found" handler
app.all('*', (_, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

// CLUSTERING

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
    const port = 8000;
    app.listen(port, () => {
        console.log(`Worker process ${process.pid} listening on port ${port}`);
    });
}
