export interface IList_Job_Posting {
	id: number;
	title: string;
	company_name: string;
	location: string;
	inserted_date: Date;
	filtered: boolean;
}

export interface IDetails_Job_Posting {
	id: number;
	title: string;
	company_name: string;
	location: string;
	description: string;
	posting_url: string;
	inserted_date: Date;
}
