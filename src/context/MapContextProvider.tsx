"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface MapContextType {
	selectedTags: number[];
	setSelectedTags: Dispatch<SetStateAction<number[]>>;
}

interface Props {
	children: React.ReactNode;
}

const mapContext = createContext<MapContextType | null>(null);

export function MapContextProvider({ children }: Props) {
	const [selectedTags, setSelectedTags] = useState<number[]>([]);

	return (
		<mapContext.Provider value={{ selectedTags, setSelectedTags }}>
			{children}
		</mapContext.Provider>
	);
}

export function useMapContext(): MapContextType | null {
	return useContext(mapContext);
}
