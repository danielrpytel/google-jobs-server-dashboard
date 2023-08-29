import { useEffect, useState } from "react";
import { IDetails_Job_Posting } from "../interfaces/Job_Posting_data";

export const useGetJobDetails = (id: number | null) => {
	const [jobDetails, setJobDetails] = useState<IDetails_Job_Posting>();
	const [loadingDetails, setLoadingDetails] = useState(true);
	const [errorDetails, setErrorDetails] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			if (!id) {
				return;
			}
			const query: string = `http://localhost:1337/job-postings/all/${id}`;
			const response = await fetch(query);
			const responseData: IDetails_Job_Posting[] = await response.json();
			setJobDetails(responseData[0]);
			try {
			} catch (error) {
				setErrorDetails("An error occured while fetching data");
				console.log(error);
			} finally {
				setLoadingDetails(false);
			}
		}

		fetchData();
	}, [id]);

	return { jobDetails, loadingDetails, errorDetails };
};
