import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { apiEndpoints } from "./api/apiConfig";
import { ApiContextProvider, IApiContext } from "./hooks/useApiContext";

function App() {
	const contextValue: IApiContext = {
		endpoints: apiEndpoints,
	};
	return (
		<ApiContextProvider value={contextValue}>
			<Routes>
				<Route path="/all" element={<Dashboard />} />
				<Route path="/boosted" element={<Dashboard />} />
				<Route path="/flagged" element={<Dashboard />} />
				<Route path="/applied" element={<Dashboard />} />
			</Routes>
		</ApiContextProvider>
	);
}

export default App;
