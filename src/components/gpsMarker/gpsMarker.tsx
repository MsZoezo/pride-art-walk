import L, { latLng } from "leaflet";
import styles from "./gpsMarker.module.css";
import { Marker } from "react-leaflet";
import { useUserLocationContext } from "@/context/UserLocationContextProvider";

export default function GpsMarker() {
    const position = useUserLocationContext();

    if(!position?.position) return;
    
    const svgIcon = new L.DivIcon({
        className: styles.icon,
        html: `<svg width="50px" height="50px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle id="${styles.circle}" cx="100" cy="100" r="100" fill="inherit" />
            <circle cx="100" cy="100" r="35" fill="#c2e0cb" />
        </svg>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
    });

    return (
        <Marker
            position={latLng(position.position.lat, position.position.long)}
            icon={svgIcon}
        >
        </Marker>
    );
}