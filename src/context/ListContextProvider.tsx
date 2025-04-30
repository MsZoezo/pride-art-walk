"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface ListContextType {
    selectedTags: Number[];
    setSelectedTags: Dispatch<SetStateAction<Number[]>>;
    searchString: String | null;
    setSearchString: Dispatch<SetStateAction<String | null>>;
}

interface Props {
    children: React.ReactNode;
}

const listContext = createContext<ListContextType | null>(null);

export function ListContextProvider({ children }: Props) {
    const [ selectedTags, setSelectedTags ] = useState<Number[]>([]);
    const [ searchString, setSearchString ] = useState<String | null>(null);

    return(
        <listContext.Provider value={{selectedTags, setSelectedTags, searchString, setSearchString}}>
            { children }
        </listContext.Provider>
    );
}

export function useListContext(): ListContextType | null {
    return useContext(listContext);
}