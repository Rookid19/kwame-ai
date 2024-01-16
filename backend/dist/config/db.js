"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
require("dotenv/config");
const db_connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "notes_app",
});
db_connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log('Connected to MySQL!');
});
exports.default = db_connection;
