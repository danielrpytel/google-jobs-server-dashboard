import { useState, useEffect } from "react";
import { IList_Job_Posting } from "../interfaces/Job_Posting_data";

export const useGetJobPostings = (endpoint: string) => {
	const [data, setData] = useState<IList_Job_Posting[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(endpoint);
				const responseData: IList_Job_Posting[] = await response.json();
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
