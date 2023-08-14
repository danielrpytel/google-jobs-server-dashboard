"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Job_Posting_Controller_1 = __importDefault(require("../controller/Job_Posting_Controller"));
const router = express_1.default.Router();
router.get("/all", Job_Posting_Controller_1.default.getAllJobPostings);
router.get("/boosted", Job_Posting_Controller_1.default.getBoostedJobPostings);
router.get("/flagged", Job_Posting_Controller_1.default.getFlaggedJobPostings);
router.get("/applied", Job_Posting_Controller_1.default.getAppliedJobPostings);
router.get("/invoke-text-filter", Job_Posting_Controller_1.default.invokeFilter);
router.put("/update/:id", Job_Posting_Controller_1.default.updateJobPosting);
router.delete("/delete/:id", Job_Posting_Controller_1.default.deleteJobPosting);
exports.default = router;
