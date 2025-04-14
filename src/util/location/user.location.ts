/**
 * This interface describes the coordinates of the users location.
 */
export interface UserLocation {
    /** User latitude. */
    lat: number;

    /** User longtitude */
    long: number;
}

/** Gets the user location if available */
export async function getUserLocation(): Promise<UserLocation | null> {
    if (!navigator.geolocation) return null;

    try {
        const { coords: { latitude: lat, longitude: long } } = await getCurrentPosition();
        
        return { lat, long };
    } catch (error: unknown) {
        console.log(error);

        return null;
    }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}