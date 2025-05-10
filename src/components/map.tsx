import { LngLatBounds, LngLatBoundsLike, MapRef, Map as ReactMap } from 'react-map-gl/maplibre';
import { DARK, layers, namedFlavor } from '@protomaps/basemaps';
import 'maplibre-gl/dist/maplibre-gl.css';

import { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAvgPosition } from '@/util/map';
import { getUserLocation } from '@/util/location/user.location';
import { Exhibition } from '@/types/Exhibition';
import { UserLocation } from '@/types/UserLocation';
import { useUserLocationContext } from '@/context/UserLocationContextProvider';
import ExhibitionMarker from './exhibitionMarker/exhibitionMarker';
import GpsMarker from './gpsMarker/gpsMarker';
import { theme } from '../util/theme';
import maplibregl, { LngLat, StyleSpecification } from 'maplibre-gl';
import ExhibitionModal from './modals/exhibitionModal/exhibitionModal';
import { env } from 'process';
import LandmarkMarker from './landmarkMarker/landmarkMarker';
import { useLoadContext } from '@/context/LoadContextProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import MapExhibitions from './mapExhibitions/mapExhibitions';

interface Props {
    exhibitions: Exhibition[];
    setIsMapLoading: Dispatch<SetStateAction<boolean>>;
}

const mapBounds: [[number, number], [number, number]] = JSON.parse(process.env.NEXT_PUBLIC_MAP_BOUNDS);
const mapCenter: [number, number] = JSON.parse(process.env.NEXT_PUBLIC_MAP_CENTER);

const initialMapZoom = Number(process.env.NEXT_PUBLIC_MAP_INITIAL_ZOOM);
const minMapZoom = Number(process.env.NEXT_PUBLIC_MAP_MIN_ZOOM);
const maxMapZoom = Number(process.env.NEXT_PUBLIC_MAP_MAX_ZOOM);

const Map = memo(({ exhibitions, setIsMapLoading }: Props) => {
    const mapStyle: StyleSpecification = useMemo(() => ({
        version: 8,
        glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
        sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
        sources: {
            protomaps: {
                type: "vector",
                url: `pmtiles://maps/${process.env.NEXT_PUBLIC_MAP}.pmtiles`,
            },
        },
        layers: layers("protomaps", theme, { lang: undefined }),
    }), []);

    const initialViewState = useMemo(() => ({
        longitude: mapCenter[0],
        latitude: mapCenter[1],
        zoom: initialMapZoom
    }), []);

    return(
        <>
            <ReactMap
                initialViewState={initialViewState}

                minZoom={minMapZoom}
                maxZoom={maxMapZoom}

                style={{ height: '100vh', width: '100%' }}

                maxBounds={mapBounds}

                attributionControl={false}

                reuseMaps={true}

                mapStyle={mapStyle}

                onLoad={() => setIsMapLoading(false)}
            >

                <LandmarkMarker name='Central station' lng={4.900576} lat={52.378905} />
                <LandmarkMarker name='Dam square' lng={4.892363} lat={52.373089} />
                <LandmarkMarker name='Homomonument' lng={4.884685} lat={52.374419} />
                <LandmarkMarker name='Vondelpark' lng={4.866347} lat={52.357652} />

                <MapExhibitions exhibitions={exhibitions} />

                <GpsMarker />
            </ReactMap>
        </>

    );
});

export default Map;