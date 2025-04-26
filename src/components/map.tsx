import { LngLatBounds, LngLatBoundsLike, Map as ReactMap } from 'react-map-gl/maplibre';
import { DARK, layers, namedFlavor } from '@protomaps/basemaps';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useEffect, useMemo, useState } from 'react';
import { getAvgPosition } from '@/util/map';
import { getUserLocation } from '@/util/location/user.location';
import { Exhibition } from '@/types/Exhibition';
import { UserLocation } from '@/types/UserLocation';
import { useUserLocationContext } from '@/context/UserLocationContextProvider';
import ExhibitionMarker from './exhibitionMarker/exhibitionMarker';
import GpsMarker from './gpsMarker/gpsMarker';
import { theme } from '../util/theme';
import maplibregl, { LngLat } from 'maplibre-gl';

interface Props {
    exhibitions: Exhibition[] | undefined;
    zoom?: number;
    onMarkerClick: (id: number) => void;
}

const Map = ({ exhibitions, zoom = 13, onMarkerClick }: Props) => {
    const position = useUserLocationContext();

    const bounds: LngLatBounds  = useMemo(() => {
        let bounds: any[]
        if(!process.env.NEXT_PUBLIC_MAP_BOUNDS) {
            // base amsterdam
            bounds = [[4.7285, 52.2782], [5.0792, 52.4312]]
        } else {
            bounds = JSON.parse(process.env.NEXT_PUBLIC_MAP_BOUNDS)
        }

        return new maplibregl.LngLatBounds(
            [bounds[0],
            bounds[1]]
        );
    }, []);

    const avgPosition: LngLat = useMemo(() => {
        if(!exhibitions) {
            return bounds.getCenter();
        };

        console.log(exhibitions);

        const markerPositions = exhibitions.map((exhibition) => {
            return exhibition.location;
        });

        if (position?.position) {
            markerPositions.push([position.position.lat, position.position.long]);
        }
        
        return getAvgPosition(markerPositions);
    }, [exhibitions, position])

    return (
        <ReactMap

            initialViewState={{
                longitude: avgPosition.lng, 
                latitude: avgPosition.lat,
                zoom: zoom
            }}

            maxZoom={zoom}

            style={{ height: '100vh', width: '100%' }}

            maxBounds={bounds}

            attributionControl={false}

            mapStyle={{
                version: 8,
                glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
                sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
                sources: {
                protomaps: {
                    type: "vector",
                    url: "https://api.protomaps.com/tiles/v4.json?key=ec50e877033148c0",
                },
                },
                layers: layers("protomaps", theme, {lang: undefined }),
            }}
        >
            
            {exhibitions?.map((exhibition, index) => (
                <ExhibitionMarker key={`exhibition-marker-${exhibition.id}`} exhibition={exhibition} onClick={onMarkerClick} />
            ))}

            <GpsMarker />
        </ReactMap>
    );
};

export default Map;