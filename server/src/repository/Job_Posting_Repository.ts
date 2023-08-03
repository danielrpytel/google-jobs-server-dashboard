import { Job_Posting_Data } from "../interface/Job_Posting_Data";
import MySQLDatabase from "../db/MySQLDatabase";

interface IJob_Posting_Repository {
	retrieveAll(searchParams: { condition: string }): Promise<Job_Posting_Data[]>;
	update(id: number, data: Partial<Job_Posting_Data>): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}

class Job_Posting_Repository implements IJob_Posting_Repository {
	private db: MySQLDatabase;

	constructor(database: MySQLDatabase) {
		this.db = database;
	}

	retrieveAll(searchParams: {
		condition?: string;
	}): Promise<Job_Posting_Data[]> {
		let query: string = "SELECT * FROM google_scraped_jobs";
		let condition: string = searchParams.condition || "";

		if (condition) {
			query += " WHERE " + condition;
		}

		return this.db.query(query);
	}

	async update(id: number, data: Partial<Job_Posting_Data>): Promise<boolean> {
		const fieldsToUpdate = Object.keys(data)
			.map((key) => `${key} = ?`)
			.join(", ");
		const values = Object.values(data);
		const query: string = `UPDATE google_scraped_jobs SET ${fieldsToUpdate} WHERE id = ?`;

		try {
			const result = await this.db.query(query, [...values, id]);
			return Promise.resolve(result.affectedRows > 0);
		} catch (error) {
			console.error("Error updating job posting: ", error);
			throw error;
		}
	}

	async delete(id: number): Promise<boolean> {
		const query = `DELETE FROM google_scraped_jobs WHERE id = ?`;

		try {
			const result = await this.db.query(query, [id]);
			return Promise.resolve(result.affectedRows > 0);
		} catch (error) {
			console.error("Error deleting job posting: ", error);
			throw error;
		}
	}
}

export default Job_Posting_Repository;
