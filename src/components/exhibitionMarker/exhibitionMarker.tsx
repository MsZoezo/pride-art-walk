import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionMarker.module.css";
import L, { latLng } from "leaflet";
import { Marker } from "react-leaflet";

interface Props {
    color: string;
    exhibition: Exhibition;

    onClick: (id: number) => void;
}

export default function ExhibitionMarker({ color, exhibition, onClick }: Props) {
    const svgIcon = new L.DivIcon({
        className: '',
        html: `
          <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill=${color} />
          </svg>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    return (
        <Marker
            position={latLng(exhibition.location[0], exhibition.location[1])}
            eventHandlers={{
                click: () => onClick(exhibition.id),
            }}
            icon={svgIcon}
        >
        </Marker>
    );
}