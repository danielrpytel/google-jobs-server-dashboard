import { Request, Response } from "express";
import Job_Posting_Repository from "../repository/Job_Posting_Repository";
import MySQLDatabase from "../db/MySQLDatabase";

const database = MySQLDatabase.getInstance();
const jobPostingRepository = new Job_Posting_Repository(database);

class Job_Posting_Controller {
	static async getAllJobPostings(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrieveAll({
				condition: "",
			});
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("internal server Error");
		}
	}

	static async getBoostedJobPostings(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrieveAll({
				condition: "boosted = 1",
			});
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}

	static async getFlaggedJobPostings(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrieveAll({
				condition: "flagged = 1",
			});
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}

	static async getAppliedJobPostings(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrieveAll({
				condition: "applied = 1",
			});
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}
}

export default Job_Posting_Controller;
