"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
class MySQLDatabase {
    constructor() {
        dotenv_1.default.config();
        this.connection = mysql_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
    }
    static getInstance() {
        if (!MySQLDatabase.instance) {
            MySQLDatabase.instance = new MySQLDatabase();
        }
        return MySQLDatabase.instance;
    }
    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL database: ", err);
                return;
            }
            console.log("Connected to database");
        });
    }
    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error("MySQL query error:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
    end() {
        this.connection.end((err) => {
            if (err) {
                console.error("Error closing MySQL connection:", err);
                return;
            }
            console.log("Closed MySQL connection");
        });
    }
}
exports.default = MySQLDatabase;
