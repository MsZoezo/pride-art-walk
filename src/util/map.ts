export function getAvgPosition(positions: any) {
    let length = positions.length
    let lat = 0;
    let lang = 0;
    for(let i = 0; i < length; i++) {
        lat += positions[i][0];
        lang += positions[i][1];
    }

    return [lat / length, lang / length];
}