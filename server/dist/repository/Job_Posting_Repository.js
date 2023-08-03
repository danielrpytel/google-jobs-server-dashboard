"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Job_Posting_Repository {
    constructor(database) {
        this.db = database;
    }
    retrieveAll(searchParams) {
        let query = "SELECT * FROM google_scraped_jobs";
        let condition = searchParams.condition || "";
        if (condition) {
            query += " WHERE " + condition;
        }
        return this.db.query(query);
    }
}
exports.default = Job_Posting_Repository;
