import { useGetJobPostings } from "../hooks/useGetJobPostings";
import { useApiContext } from "../hooks/useApiContext";
import SideList from "../components/SideList";
import JobPostingDetails from "../components/JobPostingDetails";
import { useGetJobDetails } from "../hooks/useGetJobDetails";

const Dashboard = () => {
	const { endpoints } = useApiContext();
	const path = window.location.pathname;
	const category = path.slice(1) as keyof typeof endpoints;
	const endpoint = endpoints[category];

	const { data, loading, error, selectedJobId, setSelectedJobId, refetchData } =
		useGetJobPostings(endpoint);

	const { jobDetails, loadingDetails, errorDetails } =
		useGetJobDetails(selectedJobId);

	const handleJobPostingClick = (id: number) => {
		setSelectedJobId(id);
	};

	const handleFilterComplete = () => {
		refetchData();
	};

	return (
		<div className="flex flex-row">
			<SideList
				job_list_data={data}
				onJobPostingClick={handleJobPostingClick}
				onFilterComplete={handleFilterComplete}
			/>
			{jobDetails ? (
				<JobPostingDetails jobData={jobDetails} />
			) : (
				<div> Loading Job Details </div>
			)}
		</div>
	);
};

export default Dashboard;
