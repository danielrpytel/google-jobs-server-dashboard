import express from "express";
import Job_Posting_Controller from "../controller/Job_Posting_Controller";

const router = express.Router();

router.get("/all", Job_Posting_Controller.getAllJobPostings);
router.get("/boosted", Job_Posting_Controller.getBoostedJobPostings);
router.get("/flagged", Job_Posting_Controller.getFlaggedJobPostings);
router.get("/applied", Job_Posting_Controller.getAppliedJobPostings);

router.put("/update/:id", Job_Posting_Controller.updateJobPosting);

router.delete("/delete/:id", Job_Posting_Controller.deleteJobPosting);

export default router;
