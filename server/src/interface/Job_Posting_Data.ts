export interface Job_Posting_Data {
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
}
