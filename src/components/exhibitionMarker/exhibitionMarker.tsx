import { IExhibition } from "@/types/IExhibition";
import styles from "./exhibitionMarker.module.css";
import isOpen from "@/util/datetime/isOpen";
import { Marker } from "react-map-gl/maplibre";
import { useMemo } from "react";
import { useZoomPercentageContext } from "@/context/ZoomPercentageContext";
import { colors } from "@/util/theme";

interface Props {
	exhibition: IExhibition;

	onClick: (slug: string) => void;

	transparent: boolean;
}

export default function ExhibitionMarker({ exhibition, onClick, transparent }: Props) {
	const opened = isOpen(exhibition.schedules);
	const zoomPercentage = useZoomPercentageContext();

	const size: number = useMemo(() => {
		const mod = transparent ? 0.75 : 1;

		return 20 * (mod + zoomPercentage);
	}, [zoomPercentage, transparent]);

	const fillColor = opened ? colors.exhibition_open : colors.exhibition_closed;

	return (
		<Marker
			className={opened ? styles.opened : undefined}
			latitude={exhibition.location[0]}
			longitude={exhibition.location[1]}
			onClick={() => onClick(exhibition.slug)}
		>
			<svg
				className={styles.marker}
				opacity={transparent ? 0.5 : 1}
				width={size}
				height={size}
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
			>
				{exhibition.is_star ? (
					<polygon
						points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40"
						fill={fillColor}
					/>
				) : (
					<circle
						cx="50"
						cy="50"
						r="40"
						fill={fillColor}
					/>
				)}
			</svg>
		</Marker>
	);
}
