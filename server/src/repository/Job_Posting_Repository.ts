import { Job_Posting_Data } from "../interface/Job_Posting_Data";
import MySQLDatabase from "../db/MySQLDatabase";

interface IJob_Posting_Repository {
	retrieveAll(searchParams: { condition: string }): Promise<Job_Posting_Data[]>;
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
}

export default Job_Posting_Repository;
