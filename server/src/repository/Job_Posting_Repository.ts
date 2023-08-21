import { Job_Posting_Data } from "../interface/Job_Posting_Data";
import MySQLDatabase from "../db/MySQLDatabase";

interface IJob_Posting_Repository {
	retrieveAll(id: number): Promise<Job_Posting_Data>;
	retrievePartial(searchParams: {
		condition: string;
	}): Promise<Job_Posting_Data[]>;
	retrieveForFiltering(): Promise<Job_Posting_Data[]>;
	update(id: number, data: Partial<Job_Posting_Data>): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}

class Job_Posting_Repository implements IJob_Posting_Repository {
	private db: MySQLDatabase;

	constructor(database: MySQLDatabase) {
		this.db = database;
	}

	retrievePartial(searchParams: {
		condition?: string;
	}): Promise<Job_Posting_Data[]> {
		let query: string =
			"SELECT id, title, company_name, location, inserted_date, filtered FROM google_scraped_jobs ORDER BY id DESC";
		let condition: string = searchParams.condition || "";

		if (condition) {
			query += " WHERE " + condition;
		}

		return this.db.query(query);
	}

	async retrieveAll(id: number): Promise<Job_Posting_Data> {
		const query: string =
			"SELECT id, title, company_name, location, description, posting_url, inserted_date  FROM google_scraped_jobs WHERE id = ?";
		const results = await this.db.query(query, [id]);
		return results;
	}

	async retrieveForFiltering() {
		const query: string =
			"SELECT id, title, description, filtered FROM google_scraped_jobs WHERE filtered = 0";

		const results = await this.db.query(query);
		return results;
	}

	async update(id: number, data: Partial<Job_Posting_Data>): Promise<boolean> {
		const fieldsToUpdate = Object.keys(data)
			.map((key) => `${key} = ?`)
			.join(", ");
		const values = Object.values(data);

		if (fieldsToUpdate) {
			const query: string = `UPDATE google_scraped_jobs SET ${fieldsToUpdate} WHERE id = ?`;

			try {
				const result = await this.db.query(query, [...values, id]);
				return Promise.resolve(result.affectedRows > 0);
			} catch (error) {
				console.error("Error updating job posting: ", error);
				throw error;
			}
		} else {
			console.error("No fields to update.");
			return Promise.resolve(false);
		}
	}

	async delete(id: number): Promise<boolean> {
		const query: string = `DELETE FROM google_scraped_jobs WHERE id = ?`;

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
