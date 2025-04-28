import { LngLatBounds, LngLatBoundsLike, MapRef, Map as ReactMap } from 'react-map-gl/maplibre';
import { DARK, layers, namedFlavor } from '@protomaps/basemaps';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAvgPosition } from '@/util/map';
import { getUserLocation } from '@/util/location/user.location';
import { Exhibition } from '@/types/Exhibition';
import { UserLocation } from '@/types/UserLocation';
import { useUserLocationContext } from '@/context/UserLocationContextProvider';
import ExhibitionMarker from './exhibitionMarker/exhibitionMarker';
import GpsMarker from './gpsMarker/gpsMarker';
import { theme } from '../util/theme';
import maplibregl, { LngLat } from 'maplibre-gl';
import ExhibitionModal from './modals/exhibitionModal/exhibitionModal';
import { env } from 'process';

interface Props {
    exhibitions: Exhibition[];

    setMapLoading: any;
}

const mapBounds: [[number, number], [number, number]] = JSON.parse(process.env.NEXT_PUBLIC_MAP_BOUNDS);
const mapCenter: [number, number] = JSON.parse(process.env.NEXT_PUBLIC_MAP_CENTER);

const initialMapZoom = Number(process.env.NEXT_PUBLIC_MAP_INITIAL_ZOOM);
const minMapZoom = Number(process.env.NEXT_PUBLIC_MAP_MIN_ZOOM);
const maxMapZoom = Number(process.env.NEXT_PUBLIC_MAP_MAX_ZOOM);

const Map = ({ exhibitions, setMapLoading }: Props) => {
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /** Changes the modal to the exhibition identified by id.
     * @param id the exhibition id.
    */
        const changeModal = (id: number) => {
            if (!exhibitions) return;
    
            const exhibition = exhibitions.find(exhibition => exhibition.id === id);
    
            if (!exhibition) return;
    
            setCurrentExhibition(exhibition);
            setIsModalOpen(true);
        }
    return (
        <>
            <ReactMap
                initialViewState={{
                    longitude: mapCenter[0], 
                    latitude: mapCenter[1],
                    zoom: initialMapZoom
                }}

                minZoom={minMapZoom}
                maxZoom={maxMapZoom}

                style={{ height: '100vh', width: '100%' }}

                maxBounds={mapBounds}

                attributionControl={false}

                reuseMaps={true}

                mapStyle={{
                    version: 8,
                    glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
                    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
                    sources: {
                    protomaps: {
                        type: "vector",
                        url: `pmtiles://maps/${process.env.NEXT_PUBLIC_MAP}.pmtiles`,
                    },
                    },
                    layers: layers("protomaps", theme, {lang: undefined }),
                }}
            >
                
                {exhibitions?.map((exhibition, index) => (
                    <ExhibitionMarker key={`exhibition-marker-${exhibition.id}`} exhibition={exhibition} onClick={changeModal} />
                ))}

                <GpsMarker />
            </ReactMap>
            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />
        </>

    );
};

export default Map;