import { MapContainer, TileLayer, Marker, Popup, AttributionControl } from 'react-leaflet';
import { latLng, latLngBounds, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect, useMemo, useState } from 'react';
import { getAvgPosition } from '@/util/map';
import { getUserLocation } from '@/util/location/user.location';
import { Exhibition } from '@/types/Exhibition';
import { UserLocation } from '@/types/UserLocation';
import { useUserLocationContext } from '@/context/UserLocationContextProvider';
import ExhibitionMarker from './exhibitionMarker/exhibitionMarker';
import GpsMarker from './gpsMarker/gpsMarker';
import ExhibitionModal from './modals/exhibitionModal/exhibitionModal';

interface Props {
    exhibitions: Exhibition[] | undefined;
    zoom?: number;
}

const Map = ({ exhibitions, zoom = 13 }: Props) => {
    const position = useUserLocationContext();
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const amsterdamBounds = useMemo(() => {
        let bounds: any[]
        if (!process.env.NEXT_PUBLIC_MAP_BOUNDS) {
            // base amsterdam
            bounds = [[52.2782, 4.7285], [52.4312, 5.0792]]
        } else {
            bounds = JSON.parse(process.env.NEXT_PUBLIC_MAP_BOUNDS)
        }

        return latLngBounds(bounds[0], bounds[1]);
    }, [])

    const avgPosition: LatLngExpression = useMemo(() => {
        if (!exhibitions) {
            return amsterdamBounds.getCenter();
        };

        console.log(exhibitions);

        const markerPositions = exhibitions.map((exhibition) => {
            return exhibition.location;
        });

        if (position?.position) {
            markerPositions.push([position.position.lat, position.position.long]);
        }

        return getAvgPosition(markerPositions);
    }, [])

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

    return(
        <>
            <MapContainer
                center={avgPosition}
                zoom={zoom}
                minZoom={zoom}
                style={{ height: '100vh', width: '100%' }}
                maxBounds={amsterdamBounds}
                maxBoundsViscosity={1.0}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {exhibitions?.map((exhibition, index) => (
                    <ExhibitionMarker key={`exhibition-marker-${exhibition.id}`} exhibition={exhibition} onClick={changeModal} />
                ))}

                <GpsMarker />
                <AttributionControl position="bottomleft" />
            </MapContainer>

            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />
        </>
    );
};

export default Map;