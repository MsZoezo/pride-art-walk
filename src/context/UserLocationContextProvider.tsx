"use client";
import { createContext, useContext } from "react";
import { useUserLocation } from "@/hooks/location/useUserLocation";
import { IUserLocation } from "@/types/IUserLocation";

interface UserLocationContextType {
	position: IUserLocation | null;
	error: string | null;
}
interface Props {
	children: React.ReactNode;
}

const UserLocationContext = createContext<UserLocationContextType | null>(null);

export function UserLocationProvider({ children }: Props) {
	const { position, error } = useUserLocation({ enableHighAccuracy: true, timeout: 500 });

	return (
		<UserLocationContext.Provider value={{ position, error }}>
			{children}
		</UserLocationContext.Provider>
	);
}

export function useUserLocationContext(): UserLocationContextType | null {
	return useContext(UserLocationContext);
}
