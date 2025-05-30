"use client";

import styles from "./page.module.css";

import MapNavigation from "@/components/mapNavigation/mapNavigation";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import { MapContextProvider } from "@/context/MapContextProvider";
import NewsRibbon from "@/components/newsRibbon/newsRibbon";
import MapFilters from "@/components/mapFilters/mapFilters";
import useExhibitions from "@/hooks/useExhibitions";
import Mascot from "@/components/mascot/mascot";
import Legend from "@/components/legend/legend";
import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import Map from "@/components/map";
import Link from "next/link";

/**
 * The homepage with map.
 */
export default function Home() {
	const { exhibitions, isError, isLoading, retryTime } = useExhibitions();
	const [isMapLoading, setIsMapLoading] = useState<boolean>(true);

	// Here we add support for the pmtiles protocol to the map library, with which we serve the map.
	useEffect(() => {
		let protocol = new Protocol();

		maplibregl.addProtocol("pmtiles", protocol.tile);

		return () => {
			maplibregl.removeProtocol("pmtiles");
		};
	}, []);

	const loading = isLoading || isMapLoading || isError;

	return (
		<section className={styles.content}>
			<LoadingScreen
				render={loading}
				error={isError}
				retryTime={retryTime}
			/>

			<MapNavigation>
				<Link href="/">Home</Link>
				<Link href="/exhibitions">Exhibitions</Link>
				<Link href="/news">News</Link>
				<Link href="/about">About</Link>
			</MapNavigation>

			<MapContextProvider>
				<Map
					exhibitions={exhibitions ?? []}
					setIsMapLoading={setIsMapLoading}
				/>

				<div className={styles.mapIcons}>
					<Legend loaded={!loading} />
					<MapFilters />
				</div>
			</MapContextProvider>

			<NewsRibbon />
			<Mascot />
		</section>
	);
}
