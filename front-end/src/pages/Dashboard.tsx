import { useGetJobPostings } from "../hooks/useGetJobPostings";
import { useApiContext } from "../hooks/useApiContext";

const Dashboard = () => {
	const { endpoints } = useApiContext();
	const path = window.location.pathname;
	const category = path.slice(1) as keyof typeof endpoints;
	const endpoint = endpoints[category];
	const { data, loading, error } = useGetJobPostings(endpoint);
	console.log(data);

	return <div>Hello</div>;
};

export default Dashboard;
