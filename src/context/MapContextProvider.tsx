"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface MapContextType {
    selectedTags: Number[];
    setSelectedTags: Dispatch<SetStateAction<Number[]>>;
}

interface Props {
    children: React.ReactNode;
}

const mapContext = createContext<MapContextType | null>(null);

export function MapContextProvider({ children }: Props) {
    const [ selectedTags, setSelectedTags ] = useState<Number[]>([]);

    return(
        <mapContext.Provider value={{ selectedTags, setSelectedTags }}>
            { children }
        </mapContext.Provider>
    );
}

export function useMapContext(): MapContextType | null {
    return useContext(mapContext);
}