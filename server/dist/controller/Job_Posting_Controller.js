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
}
exports.default = Job_Posting_Controller;
