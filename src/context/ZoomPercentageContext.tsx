"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";

interface Props {
	children: React.ReactNode;
}

const zoomPercentageContext = createContext<number>(0);

export function ZoomPercentageContextProvider({ children }: Props) {
	const mapCollection = useMap();

	const [zoomPercentage, setZoomPercentage] = useState<number>(0);

	useEffect(() => {
		const map = mapCollection.current;
		if (!map) return;

		const minZoom = map.getMinZoom();
		const maxZoom = map.getMaxZoom();

		const onZoom = () => {
			const zoom = map.getZoom() - minZoom;
			const max = maxZoom - minZoom;

			const percentage = zoom / max;

			setZoomPercentage(percentage);
		};

		const listener = map.on("zoom", onZoom);
		onZoom();

		return () => listener.unsubscribe();
	}, [mapCollection]);

	return (
		<zoomPercentageContext.Provider value={zoomPercentage}>
			{children}
		</zoomPercentageContext.Provider>
	);
}

export function useZoomPercentageContext(): number {
	return useContext(zoomPercentageContext);
}
