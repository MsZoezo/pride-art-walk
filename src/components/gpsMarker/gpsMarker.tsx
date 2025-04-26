import styles from "./gpsMarker.module.css";

import { Marker } from "react-map-gl/maplibre";
import { useUserLocationContext } from "@/context/UserLocationContextProvider";

export default function GpsMarker() {
    const position = useUserLocationContext();

    if(!position?.position) return;

    return (
        <Marker
            latitude={position.position.lat}
            longitude={position.position.long}
        >
            <svg width="50px" height="50px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle id={styles.circle} cx="100" cy="100" r="100" fill="inherit" />
                <circle cx="100" cy="100" r="35" fill="#c3e1cc" />
            </svg>
        </Marker>
    );
}