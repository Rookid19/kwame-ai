"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
require("dotenv/config");
const app = (0, express_1.default)();
const numCPUs = os_1.default.cpus().length;
// Root route
app.get('/', (_, res, next) => {
    res.send(`WELCOME KWAME AI ${numCPUs}`);
});
// "Route not found" handler
app.all('*', (_, res) => {
    res.status(404).json({ error: '404 Not Found' });
});
// CLUSTERING
if (cluster_1.default.isPrimary) {
    console.log(`Master process is running with process ID ${process.pid}`);
    // Fork worker processes
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    // Handle process termination
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`);
        console.log('Forking a new worker process...');
        cluster_1.default.fork();
    });
}
else {
    const port = 8000;
    app.listen(port, () => {
        console.log(`Worker process ${process.pid} listening on port ${port}`);
    });
}
