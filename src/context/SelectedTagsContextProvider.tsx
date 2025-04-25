"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
    selectedTags: Number[] | null;
}

const selectedTagsContext = createContext<Number[] | null>(null);

export function SelectedTagsContextProvider({ children, selectedTags }: Props) {
    return(
        <selectedTagsContext.Provider value={selectedTags}>
            { children }
        </selectedTagsContext.Provider>
    );
}

export function useSelectedTagsContext(): Number[] | null {
    return useContext(selectedTagsContext);
}