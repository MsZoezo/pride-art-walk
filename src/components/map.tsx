import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLng, LeafletMouseEvent } from 'leaflet';
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
        // dont need to make exception for navigator.geolocation.
        // such exception already exists in getUserLocation
        async function getUserPosition() {
            const position: any = await getUserLocation()
            if(!position) return
            setUserPosition([position.lat, position.long]);
        }

        getUserPosition();
    }, [navigator.geolocation])
    
    const avgPosition: number[] = useMemo(() => {
        const positions = markers.map((marker) => {
            return marker.location
        });
        if(userPosition) {
            positions.push(userPosition)
        }
        return getAvgPosition(positions)
    }, [markers, userPosition])

    return (
        <MapContainer center={latLng(avgPosition[0], avgPosition[1])} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker 
                    key={index} 
                    position={latLng(marker.location[0], marker.location[1])} 
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
                        position={latLng(userPosition[0], userPosition[1])} 
                    >
                    </Marker>
                )
            }
        </MapContainer>
    );
};
  
export default Map;