import { useState, useEffect } from "react";

export interface Job_Posting_Data {
	id: number;
	title: string;
	company_name: string;
	location: string;
	description: string;
	posting_url: string;
	inserted_date: Date;
	boosted: boolean;
	applied: boolean;
	flagged: boolean;
	filtered: boolean;
	identifier: string;
}

export const useGetJobPostings = (endpoint: string) => {
	const [data, setData] = useState<Job_Posting_Data[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(endpoint);
				const responseData = await response.json();
				setData(responseData);
			} catch (error) {
				setError("An error occured while fetching data");
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [endpoint]);

	return { data, loading, error };
};
