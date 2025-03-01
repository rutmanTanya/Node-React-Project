//Database connection files

const mysql = require("mysql2");
const config = require("./config");

let connection;
const db = {
    getConnection: () => {
        if (!connection) {
            connection = mysql.createConnection({
                host: config.DB_HOST,
                user: config.DB_USER,
                password: config.DB_PASSWORD,
                database: config.DB_NAME
            });

            connection.connect((err) => {
                if (err) {
                    console.error("Database connection failed:", err);
                    throw err;
                }
                console.log("Connected to MySQL Database");
            });

            //Disconnection errors
            connection.on("error", (err) => {
                console.error("Database connection error:", err);
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    connection = null; // Reset connection
                }
            });
        }
        return connection;
    },
};

module.exports = db;
