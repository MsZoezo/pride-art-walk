"use client"
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useUserLocation } from '@/hooks/location/useUserLocation';
import { UserLocation } from '@/types/UserLocation';
import { usePathname, useSearchParams } from 'next/navigation';

interface LoadContextType {
   initialLoad: boolean; 
}

interface Props {
    children: React.ReactNode
}

const loadContext = createContext<LoadContextType | null>(null);

export function LoadContextProvider({ children }: Props) {
    const pathName = usePathname();
    const params = useSearchParams();

    const isFirstLoad = useRef<boolean>(true);
    const [ initialLoad, setInitialLoad ] = useState<boolean>(true);

    useEffect(() => {
        if(isFirstLoad.current) {
            setInitialLoad(true);
            isFirstLoad.current = false;
        } else {
            setInitialLoad(false);
        }
    }, [pathName, params.toString()]);

    return (
        <loadContext.Provider value={{ initialLoad }}>
            {children}
        </loadContext.Provider>
    );
}

export function useLoadContext(): LoadContextType | null {
    return useContext(loadContext);
}
