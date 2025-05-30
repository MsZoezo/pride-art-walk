"use client";

import { IExhibition } from "@/types/IExhibition";
import ExhibitionMarker from "../exhibitionMarker/exhibitionMarker";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useMemo } from "react";
import { useMapContext } from "@/context/MapContextProvider";
import { ZoomPercentageContextProvider } from "@/context/ZoomPercentageContext";
import useModalParams from "@/hooks/useModalParams";

interface Props {
	exhibitions: IExhibition[];
}

export default function MapExhibitions({ exhibitions }: Props) {
	const { selectedTags } = useMapContext()!;

	const { showModal, closeModal, isOpen, currentItem } = useModalParams<IExhibition>(
		"exhibition",
		"/exhibitions",
		exhibitions,
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
