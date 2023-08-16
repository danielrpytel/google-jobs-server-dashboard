import React, { createContext, useContext, ReactNode } from "react";

export interface IApiContext {
	endpoints: {
		boosted: string;
		applied: string;
		flagged: string;
		all: string;
	};
}

interface ApiContextProviderProps {
	children: ReactNode;
	value: IApiContext;
}

const ApiContext = createContext<IApiContext | undefined>(undefined);

export function ApiContextProvider({
	children,
	value,
}: ApiContextProviderProps) {
	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export const useApiContext = () => {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error("ApiContext must be within APIProvider");
	}
	return context;
};
