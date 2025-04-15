/**
 * This interface describes the coordinates of the users location.
 */
export interface UserLocation {
    /** User latitude. */
    lat: number;

    /** User longtitude */
    long: number;

    accuracy?: number,
    timestamp?: number,
}
