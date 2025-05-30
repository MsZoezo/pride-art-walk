/**
 * This interface describes the coordinates of the users location.
 */
export interface IUserLocation {
	/** User latitude. */
	lat: number;

	/** User longtitude. */
	long: number;

	/** The accuracy of the location. */
	accuracy?: number;

	/** When was this location data retrieved. */
	timestamp?: number;
}
