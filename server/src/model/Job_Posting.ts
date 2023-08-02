import { Job_Posting_Data } from "../interface/Job_Posting_data";

class Job_Posting implements Job_Posting_Data {
	id: number;
	title: string;
	company_name: string;
	location: string;
	description: string;
	posting_url: string;
	inserted_date: Date;
	saved: boolean;
	applied: boolean;
	flagged: boolean;
	filtered?: boolean;
	identifier: string;

	constructor(data: Job_Posting_Data) {
		this.id = data.id;
		this.title = data.title;
		this.company_name = data.company_name;
		this.location = data.location;
		this.description = data.description;
		this.posting_url = data.posting_url;
		this.inserted_date = data.inserted_date;
		this.saved = data.saved;
		this.applied = data.applied;
		this.flagged = data.flagged;
		this.filtered = data.filtered;
		this.identifier = data.identifier;
	}
}

export default Job_Posting;
