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

interface Props {
    exhibitions: Exhibition[] | undefined;
    zoom?: number;
    onMarkerClick: (id: number) => void;
}

const Map = ({ exhibitions, zoom = 13, onMarkerClick }: Props) => {
    const position = useUserLocationContext();

    const amsterdamBounds = useMemo(() => {
        let bounds: any[]
        if(!process.env.NEXT_PUBLIC_MAP_BOUNDS) {
            // base amsterdam
            bounds = [[52.2782, 4.7285], [52.4312, 5.0792]]
        } else {
            bounds = JSON.parse(process.env.NEXT_PUBLIC_MAP_BOUNDS)
        }

        return latLngBounds(bounds[0], bounds[1]);
    }, [])

    const avgPosition: LatLngExpression = useMemo(() => {
        if(!exhibitions) {
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
    }, [exhibitions, position])

    return (
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
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {exhibitions?.map((exhibition, index) => (
                <ExhibitionMarker key={`exhibition-marker-${exhibition.id}`} exhibition={exhibition} onClick={onMarkerClick} />
            ))}

            <GpsMarker />
            <AttributionControl position="bottomleft" />
        </MapContainer>
    );
};

export default Map;