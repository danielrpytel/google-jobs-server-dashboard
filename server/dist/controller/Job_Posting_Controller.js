"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_Posting_Repository_1 = __importDefault(require("../repository/Job_Posting_Repository"));
const MySQLDatabase_1 = __importDefault(require("../db/MySQLDatabase"));
const Text_Analysis_1 = __importDefault(require("../utils/Text_Analysis"));
const database = MySQLDatabase_1.default.getInstance();
const jobPostingRepository = new Job_Posting_Repository_1.default(database);
class Job_Posting_Controller {
    static getAllJobPostings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobPostings = yield jobPostingRepository.retrieveAll({
                    condition: "",
                });
                res.status(200).json(jobPostings);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("internal server Error");
            }
        });
    }
    static getBoostedJobPostings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobPostings = yield jobPostingRepository.retrieveAll({
                    condition: "boosted = 1",
                });
                res.status(200).json(jobPostings);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static getFlaggedJobPostings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobPostings = yield jobPostingRepository.retrieveAll({
                    condition: "flagged = 1",
                });
                res.status(200).json(jobPostings);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static getAppliedJobPostings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobPostings = yield jobPostingRepository.retrieveAll({
                    condition: "applied = 1",
                });
                res.status(200).json(jobPostings);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static updateJobPosting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobPostingData = req.body;
            const id = Number(req.params.id);
            try {
                const success = yield jobPostingRepository.update(id, jobPostingData);
                if (success) {
                    res.status(200).json({ message: "Job posting updated successfully" });
                }
                else {
                    res
                        .status(404)
                        .json({ error: "Job posting not found or no change made." });
                }
            }
            catch (error) {
                console.error("Error updating job posting:", error);
                res
                    .status(500)
                    .json({ error: "An error occured while updating the job posting." });
            }
        });
    }
    static deleteJobPosting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const success = yield jobPostingRepository.delete(id);
                if (success) {
                    res.status(200).json({ message: "Job posting deleted successfully." });
                }
                else {
                    res
                        .status(404)
                        .json({ error: "Job posting not found or could not be deleted." });
                }
            }
            catch (error) {
                console.error("Error deleting job posting:", error);
                res
                    .status(500)
                    .json({ error: "An error occured while deleting the job posting." });
            }
        });
    }
    static invokeFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobPostings = yield jobPostingRepository.retrieveForFiltering();
                const updatedJobPostings = [];
                for (const posting of jobPostings) {
                    const condition = (0, Text_Analysis_1.default)(posting.description, posting.title);
                    const data = {
                        filtered: true,
                    };
                    if (condition === "boosted") {
                        data.boosted = true;
                    }
                    else {
                        data.flagged = true;
                    }
                    const success = yield jobPostingRepository.update(posting.id, data);
                    if (success) {
                        updatedJobPostings.push(Object.assign(Object.assign({}, posting.id), data));
                    }
                }
                res.status(200).json(updatedJobPostings);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
}
exports.default = Job_Posting_Controller;
