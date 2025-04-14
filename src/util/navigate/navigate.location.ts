import { getUserLocation } from "../location/user.location"

export function generateMapsLink(lat:string | number, long:string | number) {
    const userLocation = getUserLocation();
    if(userLocation) {
        return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.long}/${lat},${long}`;
    }
    return `https://www.google.com/maps/dir/${lat},${long}`;
}   