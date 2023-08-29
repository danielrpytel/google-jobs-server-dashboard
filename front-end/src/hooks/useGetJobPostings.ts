import { useState, useEffect } from "react";
import { IList_Job_Posting } from "../interfaces/Job_Posting_data";
import { useGetFilter } from "./useGetFilter";

export const useGetJobPostings = (endpoint: string) => {
	const [data, setData] = useState<IList_Job_Posting[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

	const fetchData = async () => {
		try {
			console.log("checking useEffect");
			const response = await fetch(endpoint);
			const responseData: IList_Job_Posting[] = await response.json();
			setData(responseData);

			if (responseData.length > 0) {
				setSelectedJobId(responseData[0].id);
			}
		} catch (error) {
			setError("An error occured while fetching data");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [endpoint]);

	const refetchData = () => {
		fetchData();
	};

	return { data, loading, error, selectedJobId, setSelectedJobId, refetchData };
};
