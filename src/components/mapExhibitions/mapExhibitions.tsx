"use client";

import { IExhibition } from "@/types/IExhibition";
import ExhibitionMarker from "../exhibitionMarker/exhibitionMarker";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useMemo, useRef } from "react";
import { useMapContext } from "@/context/MapContextProvider";
import { ZoomPercentageContextProvider } from "@/context/ZoomPercentageContext";
import useModalParams from "@/hooks/useModalParams";
import { useMap } from "react-map-gl/maplibre";
import maplibregl, { LngLat } from "maplibre-gl";

interface Props {
	exhibitions: IExhibition[];
}

const initialMapZoom = Number(process.env.NEXT_PUBLIC_MAP_INITIAL_ZOOM);

export default function MapExhibitions({ exhibitions }: Props) {
	const { selectedTags } = useMapContext()!;

	const prevZoom = useRef<number>(null);
	const prevLocation = useRef<LngLat>(null);

	const map = useMap();

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

	return (
		<>
			<ZoomPercentageContextProvider>
				{exhibitions?.map(exhibition => (
					<ExhibitionMarker
						key={`exhibition-marker-${exhibition.id}`}
						transparent={!shownExhibitions.includes(exhibition.id)}
						exhibition={exhibition}
						onClick={showModal}
					/>
				))}
			</ZoomPercentageContextProvider>

			<ExhibitionModal
				isOpen={isOpen}
				onClose={closeModal}
				exhibition={currentItem}
			/>
		</>
	);
}
