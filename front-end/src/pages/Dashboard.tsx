import { useGetJobPostings } from "../hooks/useGetJobPostings";
import { useApiContext } from "../hooks/useApiContext";
import SideList from "../components/SideList";

const Dashboard = () => {
	const { endpoints } = useApiContext();
	const path = window.location.pathname;
	const category = path.slice(1) as keyof typeof endpoints;
	const endpoint = endpoints[category];
	const { data, loading, error } = useGetJobPostings(endpoint);
	console.log(data);

	return <SideList job_list_data={data} />;
};

export default Dashboard;
