import mysql from "mysql";
import dotenv from "dotenv";

class MySQLDatabase {
	private static instance: MySQLDatabase;
	private connection: mysql.Connection;

	private constructor() {
		dotenv.config();
		this.connection = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
		});
	}

	public static getInstance(): MySQLDatabase {
		if (!MySQLDatabase.instance) {
			MySQLDatabase.instance = new MySQLDatabase();
		}
		return MySQLDatabase.instance;
	}

	public connect(): void {
		this.connection.connect((err) => {
			if (err) {
				console.error("Error connecting to MySQL database: ", err);
				return;
			}
			console.log("Connected to database");
		});
	}

	public query(sql: string, values?: any[]): Promise<any> {
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

	public end(): void {
		this.connection.end((err) => {
			if (err) {
				console.error("Error closing MySQL connection:", err);
				return;
			}
			console.log("Closed MySQL connection");
		});
	}
}

export default MySQLDatabase;
