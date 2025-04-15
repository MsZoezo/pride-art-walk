import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import { getUserLocation } from "../location/user.location"
import { UserLocation } from "@/types/UserLocation";

/**
 * This helper function generates a google maps url for direction to the POI.
 * 
 * @param lat Latitude of the POI.
 * @param long Longtitude of the POI.
 * @returns Google maps link.
 */

export function generateMapsLink(lat:string | number, long:string | number, userPosition?: UserLocation | null): string {
    if(userPosition) {
        return `https://www.google.com/maps/dir/${userPosition.lat},${userPosition.long}/${lat},${long}`;
    }

    return `https://www.google.com/maps/dir//${lat},${long}`;
}   