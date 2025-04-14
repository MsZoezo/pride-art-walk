import { getUserLocation, UserLocation } from "../location/user.location"

/**
 * This helper function generates a google maps url for direction to the POI.
 * 
 * @param lat Latitude of the POI.
 * @param long Longtitude of the POI.
 * @returns Google maps link.
 */
export async function generateMapsLink(lat:string | number, long:string | number): Promise<string> {
    const userLocation: UserLocation | null = await getUserLocation();

    if(userLocation) {
        return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.long}/${lat},${long}`;
    }

    return `https://www.google.com/maps/dir/${lat},${long}`;
}   