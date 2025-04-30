"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface SelectedTagsContextType {
    selectedTags: Number[];
    setSelectedTags: Dispatch<SetStateAction<Number[]>>;
}

interface Props {
    children: React.ReactNode;
}

const selectedTagsContext = createContext<SelectedTagsContextType | null>(null);

export function SelectedTagsProvider({ children }: Props) {
    const [ selectedTags, setSelectedTags ] = useState<Number[]>([]);

    return(
        <selectedTagsContext.Provider value={{selectedTags, setSelectedTags}}>
            { children }
        </selectedTagsContext.Provider>
    );
}

export function useSelectedTagsContext(): SelectedTagsContextType {
    const context = useContext(selectedTagsContext);

    if(context === null) {
        throw new Error("UseSelectedTagsContext must be used within a SelectedTagsProvider");
    }

    return context;
}