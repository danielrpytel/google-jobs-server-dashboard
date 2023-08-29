import { Request, Response } from "express";
import Job_Posting_Repository from "../repository/Job_Posting_Repository";
import MySQLDatabase from "../db/MySQLDatabase";
import filterAndGradeText from "../utils/Text_Analysis";

const database = MySQLDatabase.getInstance();
const jobPostingRepository = new Job_Posting_Repository(database);

class Job_Posting_Controller {
	static async getAllJobPostings(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const jobPostings = await jobPostingRepository.retrieveAll(id);
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("internal server Error");
		}
	}

	static async getPartialJobPostings(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrievePartial({
				condition: "",
			});
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal server Error");
		}
	}

	static async getBoostedJobPostings(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrievePartial({
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
			const jobPostings = await jobPostingRepository.retrievePartial({
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
			const jobPostings = await jobPostingRepository.retrievePartial({
				condition: "applied = 1",
			});
			res.status(200).json(jobPostings);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}

	static async updateJobPosting(req: Request, res: Response) {
		const jobPostingData = req.body;
		const id = Number(req.params.id);

		try {
			const success = await jobPostingRepository.update(id, jobPostingData);
			if (success) {
				res.status(200).json({ message: "Job posting updated successfully" });
			} else {
				res
					.status(404)
					.json({ error: "Job posting not found or no change made." });
			}
		} catch (error) {
			console.error("Error updating job posting:", error);
			res
				.status(500)
				.json({ error: "An error occured while updating the job posting." });
		}
	}

	static async deleteJobPosting(req: Request, res: Response) {
		const id = Number(req.params.id);

		try {
			const success = await jobPostingRepository.delete(id);
			if (success) {
				res.status(200).json({ message: "Job posting deleted successfully." });
			} else {
				res
					.status(404)
					.json({ error: "Job posting not found or could not be deleted." });
			}
		} catch (error) {
			console.error("Error deleting job posting:", error);
			res
				.status(500)
				.json({ error: "An error occured while deleting the job posting." });
		}
	}

	static async invokeFilter(req: Request, res: Response) {
		try {
			const jobPostings = await jobPostingRepository.retrieveForFiltering();
			let totalChangedRows = 0;

			for (const posting of jobPostings) {
				const condition = filterAndGradeText(
					posting.description,
					posting.title
				);

				const data: { [key: string]: boolean; filtered: boolean } = {
					filtered: true,
				};

				if (condition === "boosted") {
					data.boosted = true;
				} else {
					data.flagged = true;
				}

				const success = await jobPostingRepository.update(posting.id, data);

				if (success) {
					totalChangedRows++;
				}
			}
			res.status(200).json({ success: true, changedRows: totalChangedRows });
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}
}

export default Job_Posting_Controller;
