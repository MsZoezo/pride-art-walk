import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLng, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect, useMemo, useState } from 'react';
import { getAvgPosition } from '@/util/map';
import { getUserLocation, UserLocation } from '@/util/location/user.location';
import { Exhibition } from '@/types/Exhibition';

interface Props {
    exhibitions: Exhibition[]
    zoom?: number,
    onMarkerClick: (id: number) => void;
}

const Map = ({ exhibitions, zoom = 13, onMarkerClick }: Props) => {
    const [userPosition, setUserPosition] = useState<UserLocation | null>(null);

    useEffect(() => {
        // dont need to make exception for navigator.geolocation.
        // such exception already exists in getUserLocation
        (async () => {
            const position: UserLocation | null = await getUserLocation();

            if (!position) return;
            setUserPosition(position);
        })();
    }, [navigator.geolocation])

    const avgPosition: number[] = useMemo(() => {
        const positions = exhibitions.map((exhibition) => {
            return exhibition.location;
        });
        if (userPosition) {
            positions.push([userPosition.lat, userPosition.long]);
        }
        return getAvgPosition(positions);
    }, [exhibitions, userPosition])

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

    return (
        <MapContainer 
            center={latLng(avgPosition[0], avgPosition[1])}
            zoom={zoom} 
            minZoom={zoom} 
            style={{ height: '100vh', width: '100%' }}
            maxBounds={amsterdamBounds}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {exhibitions.map((exhibition, index) => (
                <Marker 
                    key={`exhibition-marker-${exhibition.id}`}
                    position={latLng(exhibition.location[0], exhibition.location[1])} 
                    eventHandlers={{
                        click: () => onMarkerClick(exhibition.id),
                    }}
                >
                </Marker>
            ))}
            {
                userPosition && (
                    <Marker 
                        
                        key={'user'} 
                        position={latLng(userPosition.lat, userPosition.long)} 
                    >
                    </Marker>
                )
            }
        </MapContainer>
    );
};

export default Map;