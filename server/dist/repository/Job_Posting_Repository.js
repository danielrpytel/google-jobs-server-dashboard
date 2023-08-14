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
    retrieveForFiltering() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT id, title, description, filtered FROM google_scraped_jobs WHERE filtered = 0";
            const results = yield this.db.query(query);
            return results;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const fieldsToUpdate = Object.keys(data)
                .map((key) => `${key} = ?`)
                .join(", ");
            const values = Object.values(data);
            if (fieldsToUpdate) {
                const query = `UPDATE google_scraped_jobs SET ${fieldsToUpdate} WHERE id = ?`;
                try {
                    const result = yield this.db.query(query, [...values, id]);
                    return Promise.resolve(result.affectedRows > 0);
                }
                catch (error) {
                    console.error("Error updating job posting: ", error);
                    throw error;
                }
            }
            else {
                console.error("No fields to update.");
                return Promise.resolve(false);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM google_scraped_jobs WHERE id = ?`;
            try {
                const result = yield this.db.query(query, [id]);
                return Promise.resolve(result.affectedRows > 0);
            }
            catch (error) {
                console.error("Error deleting job posting: ", error);
                throw error;
            }
        });
    }
}
exports.default = Job_Posting_Repository;
