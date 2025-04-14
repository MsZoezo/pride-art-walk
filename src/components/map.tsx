import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect, useMemo, useState } from 'react';
import { getAvgPosition } from '@/util/map';
import { getUserLocation } from '@/util/location/user.location';

interface Props {
    markers: { location: number[], title: string, }[]
    zoom?: number,
    onMarkerClick: (title: string) => void;
}

const Map = ({ markers, zoom = 13, onMarkerClick  }:Props) => {
    const [userPosition, setUserPosition] = useState<any[] | null>(null);
    
    useEffect(() => {
        if(!navigator.geolocation) return
        async function getUserPosition() {
            const position = await getUserLocation()
            setUserPosition([position.lat, position.long]);
        }

        getUserPosition();
    }, [navigator.geolocation])
    
    const avgPosition = useMemo(() => {
        const positions = markers.map((marker) => {
            return marker.location
        });
        return getAvgPosition(positions)
    }, [markers])

    return (
        <MapContainer center={avgPosition} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker 
                    key={index} 
                    position={marker.location} 
                    eventHandlers={{
                        click: () => onMarkerClick(marker.title),
                    }}
                >
                    {/* <Popup>
                        <span dangerouslySetInnerHTML={{ __html: marker.title }}/>
                    </Popup> */}
                </Marker>
            ))}
            {
                userPosition && (
                    <Marker 
                        key={'user'} 
                        position={userPosition} 
                    >
                    </Marker>
                )
            }
        </MapContainer>
    );
};
  
export default Map;