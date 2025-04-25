"use client";

import { Exhibition } from "@/types/Exhibition";
import { getExhibitions } from "@/util/fetch/map/exhibitions";
import { createContext, useContext, useEffect, useState } from "react";

interface Props {
    children: React.ReactNode
}

const ExhibitionsContext = createContext<Exhibition[] | null>(null);

export function ExhibitionsContextProvider({ children }: Props) {
    const [exhibitions, setExhibitions] = useState<Exhibition[] | null>(null);

    useEffect(() => {
        (async () => {
            const exhibitions: Exhibition[] | null = await getExhibitions();
            setExhibitions(exhibitions);
        })();
    }, [])

    return(
        <ExhibitionsContext.Provider value={exhibitions}>
            { children }
        </ExhibitionsContext.Provider>
    );
}

export function useExhibitionsContext(): Exhibition[] | null {
    return useContext(ExhibitionsContext);
}