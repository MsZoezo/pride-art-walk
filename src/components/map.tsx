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
import ExhibitionModal from './modals/exhibitionModal/exhibitionModal';
import { env } from 'process';

interface Props {
    exhibitions: Exhibition[] | undefined;
    zoom?: number;
}

const Map = ({ exhibitions, zoom = 13 }: Props) => {
    const position = useUserLocationContext();
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
    }, []);

    return (
        <>
            <ReactMap

                initialViewState={{
                    longitude: avgPosition.lng, 
                    latitude: avgPosition.lat,
                    zoom: 0
                }}

                minZoom={0}
                maxZoom={20}

                style={{ height: '100vh', width: '100%' }}

                maxBounds={bounds}

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