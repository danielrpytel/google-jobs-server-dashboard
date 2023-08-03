"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Job_Posting {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.company_name = data.company_name;
        this.location = data.location;
        this.description = data.description;
        this.posting_url = data.posting_url;
        this.inserted_date = data.inserted_date;
        this.boosted = data.boosted;
        this.applied = data.applied;
        this.flagged = data.flagged;
        this.filtered = data.filtered;
        this.identifier = data.identifier;
    }
}
exports.default = Job_Posting;
