"use client";

import { IExhibition } from "@/types/IExhibition";
import ExhibitionMarker from "../exhibitionMarker/exhibitionMarker";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useEffect, useMemo, useState } from "react";
import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams } from "next/navigation";
import { useMapContext } from "@/context/MapContextProvider";
import { ZoomPercentageContextProvider } from "@/context/ZoomPercentageContext";

interface Props {
	exhibitions: IExhibition[];
}

export default function MapExhibitions({ exhibitions }: Props) {
	const params = useSearchParams();
	const { initialLoad } = useLoadContext()!;
	const { selectedTags } = useMapContext()!;

	const [currentExhibition, setCurrentExhibition] = useState<IExhibition | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	/** Changes the modal to the exhibition identified by id.
	 * @param id the exhibition id.
	 */
	const changeModal = (id: number) => {
		if (!exhibitions) return;

		const exhibition = exhibitions.find(exhibition => exhibition.id === id);

		window.history.pushState(null, "", `?exhibition=${id}`);

		if (!exhibition) return;

		setCurrentExhibition(exhibition);
		setIsModalOpen(true);
	};

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

	const closeModal = () => {
		if (!initialLoad && params.get("exhibition")) window.history.back();
		else window.history.replaceState(null, "", "/");

		setIsModalOpen(false);
	};

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
						onClick={changeModal}
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
