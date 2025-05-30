"use client";

import { UserLocationProvider } from "@/context/UserLocationContextProvider";
import { LoadContextProvider } from "@/context/LoadContextProvider";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

/**
 * This component initializes all global context providers needed in our layouts.
 */
export default function Providers({ children }: Props) {
	return (
		<LoadContextProvider>
			<UserLocationProvider>{children}</UserLocationProvider>
		</LoadContextProvider>
	);
}
