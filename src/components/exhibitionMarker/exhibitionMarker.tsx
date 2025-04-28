import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionMarker.module.css";
import isOpen from "@/util/datetime/isOpen";
import { Marker } from "react-map-gl/maplibre";

interface Props {
    exhibition: Exhibition;

    onClick: (id: number) => void;
}

export default function ExhibitionMarker({ exhibition, onClick }: Props) {
    const opened = isOpen(exhibition.schedules);
    
    return (
        <Marker latitude={exhibition.location[0]} longitude={exhibition.location[1]} onClick={ () => onClick(exhibition.id) }>
          <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill={opened ? '#FFDE00' : '#829fae'} />
          </svg>
        </Marker>
    );
}