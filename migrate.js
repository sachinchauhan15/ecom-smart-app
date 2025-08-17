const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config(); 

const sql = fs.readFileSync("migrations/init.sql", "utf8");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  connection.query(sql, (err) => {
    if (err) {
      console.error("Migration failed:", err);
    } else {
      console.log("Migration applied successfully!");
    }
    connection.end();
  });
});
