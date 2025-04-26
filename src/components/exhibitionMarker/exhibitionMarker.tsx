import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionMarker.module.css";
import L, { latLng } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import isOpen from "@/util/datetime/isOpen";

interface Props {
    exhibition: Exhibition;

    onClick: (id: number) => void;
}

export default function ExhibitionMarker({ exhibition, onClick }: Props) {
    const opened = isOpen(exhibition.schedules);
    
    const svgIcon = new L.DivIcon({
        className: '',
        html: `
          <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill=${opened ? '#FFDE00' : '#829fae'} />
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