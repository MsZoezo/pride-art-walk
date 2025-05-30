"use client";

import { IExhibition } from "@/types/IExhibition";
import ExhibitionMarker from "../exhibitionMarker/exhibitionMarker";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useEffect, useMemo, useState } from "react";
import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams } from "next/navigation";
import { useMapContext } from "@/context/MapContextProvider";
import { ZoomPercentageContextProvider } from "@/context/ZoomPercentageContext";
import { ModalWindowState } from "@/util/modals";

interface Props {
	exhibitions: IExhibition[];
}

export default function MapExhibitions({ exhibitions }: Props) {
	const params = useSearchParams();
	const { selectedTags } = useMapContext()!;

	const { showModal, closeModal } = ModalWindowState("exhibition", "/exhibitions");

	const [currentExhibition, setCurrentExhibition] = useState<IExhibition | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const id = params.get("exhibition");

		if (!id) {
			setIsModalOpen(false);
			return;
		}

		const exhibition = exhibitions.find(exhibition => exhibition.id === Number(id));

		if (!exhibition) {
			setIsModalOpen(false);
			return;
		}

		if (exhibition === currentExhibition && isModalOpen) return;

		setCurrentExhibition(exhibition);
		setIsModalOpen(true);
	}, [params, exhibitions]);

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
				isOpen={isModalOpen}
				onClose={closeModal}
				exhibition={currentExhibition}
			/>
		</>
	);
}
