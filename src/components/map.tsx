import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useMemo } from 'react';
import { getAvgPosition } from '@/util/map';

interface Props {
    markers: { position: number[], content: string }[]
    zoom?: number
}
const Map = ({ markers, zoom = 13 }:Props) => {
    const avgPosition = useMemo(() => {
        const positions = markers.map((marker) => {
            return marker.position
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
                <Marker key={index} position={marker.position}>
                    <Popup>
                        <span dangerouslySetInnerHTML={{ __html: marker.content }}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
  
export default Map;