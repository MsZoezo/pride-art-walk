import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionMarker.module.css";
import isOpen from "@/util/datetime/isOpen";
import { Marker, useMap } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";

interface Props {
    exhibition: Exhibition;

    onClick: (id: number) => void;
}

export default function ExhibitionMarker({ exhibition, onClick }: Props) {
    const mapCollection = useMap();

    const [ zoomPercentage, setZoomPercentage ] = useState<number>(0);

    useEffect(() => {
      const map = mapCollection.current;
      if(!map) return;

      const minZoom = map.getMinZoom();
      const maxZoom = map.getMaxZoom();

      const onZoom = () => {
        const zoom = map.getZoom() - minZoom;
        const max = maxZoom - minZoom;

        const percentage = zoom / max;

        setZoomPercentage(percentage);
      }

      const listener = map.on('zoomend', onZoom);
      onZoom();

      return () => listener.unsubscribe();
    }, [mapCollection]);

    const opened = isOpen(exhibition.schedules);
    
    return (
        <Marker latitude={exhibition.location[0]} longitude={exhibition.location[1]} onClick={ () => onClick(exhibition.id) }>
          <svg className={styles.marker} width={20 * (1 + zoomPercentage)} height={20 * (1 + zoomPercentage)} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill={opened ? '#FFDE00' : '#829fae'} />
          </svg>
        </Marker>
    );
}