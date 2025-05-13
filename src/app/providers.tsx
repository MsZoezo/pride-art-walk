"use client";

import { LoadContextProvider } from "@/context/LoadContextProvider";
import { UserLocationProvider } from "@/context/UserLocationContextProvider";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Providers({ children }: Props) {
    return(
        <LoadContextProvider>
            <UserLocationProvider>
                {children}
            </UserLocationProvider>
        </LoadContextProvider>  
    );
}