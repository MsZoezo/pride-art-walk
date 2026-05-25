"use client";

import { IExhibition } from "@/types/IExhibition";
import ExhibitionMarker from "../exhibitionMarker/exhibitionMarker";
import ClusterMarker from "../clusterMarker/clusterMarker";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import ClusterSelectionModal from "../modals/clusterSelectionModal/clusterSelectionModal";
import { useMemo, useRef, useState, useCallback } from "react";
import { useMapContext } from "@/context/MapContextProvider";
import { ZoomPercentageContextProvider } from "@/context/ZoomPercentageContext";
import useModalParams from "@/hooks/useModalParams";
import { useMap } from "react-map-gl/maplibre";
import maplibregl, { LngLat } from "maplibre-gl";

interface Cluster {
	id: string;
	exhibitions: IExhibition[];
	latitude: number;
	longitude: number;
}

function clusterExhibitions(exhibitions: IExhibition[]): Cluster[] {
	// Very small threshold - only cluster if almost exact same location
	// ~0.0003 degrees = roughly 30 meters
	const threshold = 0.0003;

	const clusters: Cluster[] = [];
	const assigned = new Set<number>();

	for (const exhibition of exhibitions) {
		if (assigned.has(exhibition.id)) continue;

		const cluster: IExhibition[] = [exhibition];
		assigned.add(exhibition.id);

		// Find nearby exhibitions
		for (const other of exhibitions) {
			if (assigned.has(other.id)) continue;

			const latDiff = Math.abs(exhibition.location[0] - other.location[0]);
			const lngDiff = Math.abs(exhibition.location[1] - other.location[1]);

			if (latDiff < threshold && lngDiff < threshold) {
				cluster.push(other);
				assigned.add(other.id);
			}
		}

		// Calculate center of cluster
		const avgLat = cluster.reduce((sum, ex) => sum + ex.location[0], 0) / cluster.length;
		const avgLng = cluster.reduce((sum, ex) => sum + ex.location[1], 0) / cluster.length;

		clusters.push({
			id: `cluster-${exhibition.id}`,
			exhibitions: cluster,
			latitude: avgLat,
			longitude: avgLng,
		});
	}

	return clusters;
}

interface Props {
	exhibitions: IExhibition[];
}

const initialMapZoom = Number(process.env.NEXT_PUBLIC_MAP_INITIAL_ZOOM);

export default function MapExhibitions({ exhibitions }: Props) {
	const { selectedTags } = useMapContext()!;

	const prevZoom = useRef<number>(null);
	const prevLocation = useRef<LngLat>(null);

	const map = useMap();

	// State for cluster selection modal
	const [clusterModalOpen, setClusterModalOpen] = useState(false);
	const [selectedCluster, setSelectedCluster] = useState<IExhibition[]>([]);

	const onModalOpen = (item: IExhibition) => {
		if (!map.current) return;

		const maxZoom = map.current.getMaxZoom();

		prevZoom.current = map.current.getZoom();
		prevLocation.current = map.current.getCenter();

		map.current.flyTo({
			center: new maplibregl.LngLat(item.location[1], item.location[0]),
			zoom: maxZoom,
		});
	};

	const onModalClose = () => {
		if (!map.current || !currentItem) return;

		const zoom = prevZoom.current ?? initialMapZoom;

		let lng = currentItem.location[1];
		let lat = currentItem.location[0];

		if (prevLocation.current) {
			lng = lng + 0.75 * (prevLocation.current.lng - lng);
			lat = lat + 0.75 * (prevLocation.current.lat - lat);
		}

		map.current.flyTo({
			center: new maplibregl.LngLat(lng, lat),
			zoom: zoom,
		});
	};

	const { showModal, closeModal, isOpen, currentItem } = useModalParams<IExhibition>(
		"exhibition",
		"/",
		exhibitions,
		onModalOpen,
		onModalClose,
	);

	const shownExhibitions: number[] = useMemo(() => {
		if (!exhibitions) return [];

		let shownExhibitions = [...exhibitions];

		if (selectedTags.length == 0) return shownExhibitions.map(ex => ex.id);

		if (selectedTags.length != 0) {
			shownExhibitions = shownExhibitions.filter(exhibition => {
				for (let i = 0; i < selectedTags.length; i++) {
					if (!exhibition.tags.find(tag => tag.id === selectedTags[i])) continue;

					return true;
				}
				return false;
			});
		}

		return shownExhibitions.map(ex => ex.id);
	}, [exhibitions, selectedTags]);

	// Cluster exhibitions based on location proximity
	const clusters = useMemo(() => {
		if (!exhibitions) return [];
		return clusterExhibitions(exhibitions);
	}, [exhibitions]);

	const handleClusterClick = useCallback((clusterExhibitions: IExhibition[]) => {
		setSelectedCluster(clusterExhibitions);
		setClusterModalOpen(true);
	}, []);

	const handleClusterSelection = useCallback((slug: string) => {
		setClusterModalOpen(false);
		showModal(slug);
	}, [showModal]);

	return (
		<>
			<ZoomPercentageContextProvider>
				{clusters.map(cluster => {
					const isTransparent = !cluster.exhibitions.some(ex => shownExhibitions.includes(ex.id));

					if (cluster.exhibitions.length === 1) {
						return (
							<ExhibitionMarker
								key={`exhibition-marker-${cluster.exhibitions[0].id}`}
								transparent={isTransparent}
								exhibition={cluster.exhibitions[0]}
								onClick={showModal}
							/>
						);
					}

					return (
						<ClusterMarker
							key={cluster.id}
							exhibitions={cluster.exhibitions}
							latitude={cluster.latitude}
							longitude={cluster.longitude}
							transparent={isTransparent}
							onClick={() => handleClusterClick(cluster.exhibitions)}
						/>
					);
				})}
			</ZoomPercentageContextProvider>

			<ExhibitionModal
				isOpen={isOpen}
				onClose={closeModal}
				exhibition={currentItem}
			/>

			<ClusterSelectionModal
				isOpen={clusterModalOpen}
				onClose={() => setClusterModalOpen(false)}
				exhibitions={selectedCluster}
				onSelectExhibition={handleClusterSelection}
			/>
		</>
	);
}
