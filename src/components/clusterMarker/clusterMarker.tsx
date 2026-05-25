"use client";

import { IExhibition } from "@/types/IExhibition";
import styles from "./clusterMarker.module.css";
import isOpen from "@/util/datetime/isOpen";
import { Marker } from "react-map-gl/maplibre";
import { useMemo } from "react";
import { useZoomPercentageContext } from "@/context/ZoomPercentageContext";
import { colors } from "@/util/theme";

interface Props {
	exhibitions: IExhibition[];
	latitude: number;
	longitude: number;
	onClick: () => void;
	transparent: boolean;
}

export default function ClusterMarker({ exhibitions, latitude, longitude, onClick, transparent }: Props) {
	const zoomPercentage = useZoomPercentageContext();

	// Check if any exhibition in cluster is open
	const hasOpenExhibition = useMemo(() => {
		return exhibitions.some(ex => isOpen(ex.schedules));
	}, [exhibitions]);

	const size: number = useMemo(() => {
		const mod = transparent ? 0.75 : 1;
		// Slightly larger for clusters
		return 25 * (mod + zoomPercentage);
	}, [zoomPercentage, transparent]);

	const fillColor = hasOpenExhibition ? colors.exhibition_open : colors.exhibition_closed;

	return (
		<Marker
			className={hasOpenExhibition ? styles.opened : undefined}
			latitude={latitude}
			longitude={longitude}
			onClick={onClick}
		>
			<svg
				className={styles.marker}
				opacity={transparent ? 0.5 : 1}
				width={size}
				height={size}
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="50"
					cy="50"
					r="45"
					fill={fillColor}
				/>
				<text
					x="50"
					y="50"
					textAnchor="middle"
					dominantBaseline="central"
					fill="white"
					fontSize="40"
					fontWeight="bold"
				>
					{exhibitions.length}
				</text>
			</svg>
		</Marker>
	);
}
