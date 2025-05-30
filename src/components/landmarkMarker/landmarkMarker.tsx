import styles from "./landmarkMarker.module.css";

import { Marker } from "react-map-gl/maplibre";

interface Props {
	name: string;

	lng: number;
	lat: number;
}

export default function LandmarkMarker({ name, lng, lat }: Props) {
	return (
		<Marker
			latitude={lat}
			longitude={lng}
		>
			<p className={styles.name}>{name}</p>
		</Marker>
	);
}
