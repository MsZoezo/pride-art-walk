import L, { latLng } from "leaflet";
import styles from "./gpsMarker.module.css";
import { Marker } from "react-leaflet";
import { useUserLocationContext } from "@/context/UserLocationContextProvider";

export default function GpsMarker() {
    const position = useUserLocationContext();

    if(!position?.position) return;
    
    const svgIcon = new L.DivIcon({
        className: styles.icon,
        html: `<svg width="45px" height="45px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="rainbow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(255,0,0,1)" />
                <stop offset="10%" stop-color="rgba(255,154,0,1)" />
                <stop offset="20%" stop-color="rgba(208,222,33,1)" />
                <stop offset="30%" stop-color="rgba(79,220,74,1)" />
                <stop offset="40%" stop-color="rgba(63,218,216,1)" />
                <stop offset="50%" stop-color="rgba(47,201,226,1)" />
                <stop offset="60%" stop-color="rgba(28,127,238,1)" />
                <stop offset="70%" stop-color="rgba(95,21,242,1)" />
                <stop offset="80%" stop-color="rgba(186,12,248,1)" />
                <stop offset="90%" stop-color="rgba(251,7,217,1)" />
                <stop offset="100%" stop-color="rgba(255,0,0,1)" />
            </linearGradient>
        </defs>
        <path fill="url(#rainbow)" d="M13.9 2.999A1.9 1.9 0 1 1 12 1.1a1.9 1.9 0 0 1 1.9 1.899zM13.544 6h-3.088a1.855 1.855 0 0 0-1.8 1.405l-1.662 6.652a.667.667 0 0 0 .14.573.873.873 0 0 0 .665.33.718.718 0 0 0 .653-.445L10 9.1V13l-.922 9.219a.71.71 0 0 0 .707.781h.074a.69.69 0 0 0 .678-.563L12 14.583l1.463 7.854a.69.69 0 0 0 .678.563h.074a.71.71 0 0 0 .707-.781L14 13V9.1l1.548 5.415a.718.718 0 0 0 .653.444.873.873 0 0 0 .665-.329.667.667 0 0 0 .14-.573l-1.662-6.652A1.855 1.855 0 0 0 13.544 6z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
    </svg>`,
        iconSize: [45, 45],
        iconAnchor: [15, 15],
    });

    return (
        <Marker
            position={latLng(position.position.lat, position.position.long)}
            icon={svgIcon}
        >
        </Marker>
    );
}