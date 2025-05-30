import { UserLocation } from "@/types/UserLocation";
import { useState, useEffect } from "react";

export function useUserLocation(options?: PositionOptions) {
	const [position, setPosition] = useState<UserLocation | null>(null);
	const [error, setError] = useState<string | null>(null);

	function updatePosition(pos: GeolocationPosition) {
		if (pos.coords.latitude === position?.lat && pos.coords.longitude === position?.long)
			return;
		setPosition({
			lat: pos.coords.latitude,
			long: pos.coords.longitude,
			accuracy: pos.coords.accuracy,
			timestamp: pos.timestamp,
		});
	}

	function throwError(err: GeolocationPositionError) {
		setError(err.message);
	}

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser.");
			return;
		}

		const watchId = navigator.geolocation.watchPosition(updatePosition, throwError, options);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, [options]);

	return { position, error };
}
