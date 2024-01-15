import express from 'express';
import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();
