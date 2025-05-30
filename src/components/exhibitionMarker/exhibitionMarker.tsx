import { IExhibition } from "@/types/IExhibition";
import styles from "./exhibitionMarker.module.css";
import isOpen from "@/util/datetime/isOpen";
import { Marker, useMap } from "react-map-gl/maplibre";
import { useEffect, useMemo, useState } from "react";
import { useZoomPercentageContext } from "@/context/ZoomPercentageContext";
import { colors } from "@/util/theme";

interface Props {
	exhibition: IExhibition;

	onClick: (id: number) => void;

	transparent: boolean;
}

export default function ExhibitionMarker({ exhibition, onClick, transparent }: Props) {
	const opened = isOpen(exhibition.schedules);
	const zoomPercentage = useZoomPercentageContext();

	const size: number = useMemo(() => {
		const mod = transparent ? 0.75 : 1;

		return 20 * (mod + zoomPercentage);
	}, [zoomPercentage, transparent]);
	return (
		<Marker
			className={opened ? styles.opened : undefined}
			latitude={exhibition.location[0]}
			longitude={exhibition.location[1]}
			onClick={() => onClick(exhibition.id)}
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
					r="40"
					fill={opened ? colors.exhibition_open : colors.exhibition_closed}
				/>
			</svg>
		</Marker>
	);
}
