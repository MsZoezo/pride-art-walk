"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ListContextType {
	selectedTags: number[];
	setSelectedTags: Dispatch<SetStateAction<number[]>>;
	searchString: string | null;
	setSearchString: Dispatch<SetStateAction<string | null>>;
}

interface Props {
	children: React.ReactNode;
}

const listContext = createContext<ListContextType | null>(null);

export function ListContextProvider({ children }: Props) {
	const [selectedTags, setSelectedTags] = useState<number[]>([]);
	const [searchString, setSearchString] = useState<string | null>(null);

	return (
		<listContext.Provider
			value={{ selectedTags, setSelectedTags, searchString, setSearchString }}
		>
			{children}
		</listContext.Provider>
	);
}

export function useListContext(): ListContextType | null {
	return useContext(listContext);
}
