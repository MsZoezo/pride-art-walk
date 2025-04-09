import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useMemo } from 'react';
import { getAvgPosition } from '@/util/map';

interface Props {
    markers: { location: number[], title: string, }[]
    zoom?: number,
    onMarkerClick: (event: LeafletMouseEvent) => void;
}

const Map = ({ markers, zoom = 13, onMarkerClick  }:Props) => {
    const avgPosition = useMemo(() => {
        const positions = markers.map((marker) => {
            return marker.location
        });
        return getAvgPosition(positions)
    }, [markers])

    return (
        <MapContainer center={avgPosition} zoom={zoom} style={{ height: '50vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker 
                    key={index} 
                    position={marker.location} 
                    eventHandlers={{
                        click: onMarkerClick,
                    }}
                >
                    <Popup>
                        <span dangerouslySetInnerHTML={{ __html: marker.title }}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
  
export default Map;