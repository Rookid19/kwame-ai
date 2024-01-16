import mysql from "mysql";
import 'dotenv/config';



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "notes_app",

});


db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log('Connected to MySQL!')
});

export default db;

