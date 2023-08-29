import { useState } from "react";

export function useGetFilter(refetchData: () => void) {
	const [filterStatus, setFilterStatus] = useState<string>("");
	const [changedRows, setChangedRows] = useState<number>(0);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDiv = () => {
		setIsOpen(!isOpen);
		setFilterStatus("");
	};

	const handleFilterClick = async () => {
		try {
			const query: string =
				"http://localhost:1337/job-postings/invoke-text-filter";
			const response = await fetch(query);
			if (response.ok) {
				const data = await response.json();
				const changedRows = data.changedRows;

				setChangedRows(changedRows);
				console.log("Checking useCallback", changedRows);
				setFilterStatus("success");
				refetchData();
			} else {
				setFilterStatus("error");
			}
		} catch (error) {
			console.error("An error occured", error);
			setFilterStatus("error");
		} finally {
		}
	};
	return {
		filterStatus,
		changedRows,
		handleFilterClick,
		isOpen,
		toggleDiv,
	};
}
