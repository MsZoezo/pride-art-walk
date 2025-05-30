import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import { UserLocation } from "@/types/IUserLocation";

/**
 * This helper function generates a google maps url for direction to the POI.
 *
 * @param lat Latitude of the POI.
 * @param long Longtitude of the POI.
 * @param travelMode Type of travel mode.
 * @returns Google maps link.
 */

export function generateMapsLink(
	lat: string | number,
	long: string | number,
	userPosition?: UserLocation | null,
	travelMode = "bicycling",
): string {
	const baseUrl = "https://www.google.com/maps/dir/?api=1";
	const destination = `${lat},${long}`;

	if (userPosition) {
		const origin = `${userPosition.lat},${userPosition.long}`;
		return `${baseUrl}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;
	}

	return `${baseUrl}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;
}
