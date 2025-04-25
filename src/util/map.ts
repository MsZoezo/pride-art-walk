import { LatLng, latLng } from "leaflet";

/**
 * This helper function gets the average of all positions given.
 * 
 * @param positions All of the positions to average out
 * @returns Average position
 */
export function getAvgPosition(positions: number[][]): LatLng {
    const length = positions.length

    let lat = 0;
    let lang = 0;
    
    for(let i = 0; i < length; i++) {
        lat += positions[i][0];
        lang += positions[i][1];
    }

    return latLng(lat / length, lang / length);
}