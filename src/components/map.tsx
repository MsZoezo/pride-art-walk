import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLng, LeafletMouseEvent, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { memo, useEffect, useMemo, useState } from 'react';
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
            style={{ height: '100vh', width: '100%' }}
            maxBounds={amsterdamBounds}
            maxBoundsViscosity={1.0}
        >
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
  
export default memo(Map);