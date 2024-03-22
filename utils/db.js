const mysql = require("mysql");
const dbConfig = require("./dbconfig");

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'Taukhongnho1',
  database: 'asset',
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
