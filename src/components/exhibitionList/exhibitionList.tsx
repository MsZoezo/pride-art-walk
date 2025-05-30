"use client";

import { IExhibition } from "@/types/IExhibition";
import styles from "./exhibitionList.module.css";
import ExhibitionCard from "../exhibitionCard/exhibitionCard";
import { useEffect, useMemo, useState } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useListContext } from "@/context/ListContextProvider";
import { useSearchParams } from "next/navigation";
import { useLoadContext } from "@/context/LoadContextProvider";
import { ModalWindowState } from "@/util/modals";

interface Props {
	exhibitions: IExhibition[];
}

export default function ExhibitionList({ exhibitions }: Props) {
	const params = useSearchParams();
	const { selectedTags, searchString } = useListContext()!;

	const { showModal, closeModal } = ModalWindowState("exhibition", "/exhibitions");

	const [currentExhibition, setCurrentExhibition] = useState<IExhibition | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const id = params.get("exhibition");

		if (!id) {
			setIsModalOpen(false);
			return;
		}

		const exhibition = exhibitions?.find(val => val.id === Number(id));

		if (exhibition === currentExhibition && isModalOpen) return;

		if (!exhibition) {
			setIsModalOpen(false);
			return;
		}

		setCurrentExhibition(exhibition);
		setIsModalOpen(true);
	}, [params, exhibitions]);

	const shownExhibitions = useMemo(() => {
		if (!exhibitions) return;

		let shownExhibitions = [...exhibitions];

		if (selectedTags.length == 0 && (!searchString || searchString.length == 0)) {
			return shownExhibitions;
		}

		if (selectedTags.length != 0) {
			shownExhibitions = shownExhibitions.filter(exhibition => {
				for (let i = 0; i < selectedTags.length; i++) {
					if (!exhibition.tags.find(tag => tag.id === selectedTags[i])) continue;

					return true;
				}
				return false;
			});
		}

		if (searchString) {
			const lowerSearch = searchString.toLowerCase();

			shownExhibitions = shownExhibitions.filter(
				exhibition =>
					exhibition.title.toLowerCase().includes(lowerSearch) ||
					exhibition.address?.toLowerCase().includes(lowerSearch) ||
					exhibition.venue_name?.toLowerCase().includes(lowerSearch) ||
					exhibition.artist_name?.some(artist =>
						artist.toLowerCase().includes(lowerSearch),
					),
			);
		}

		return shownExhibitions;
	}, [exhibitions, selectedTags, searchString]);

	return (
		<>
			{searchString?.length != 0 && shownExhibitions?.length == 0 && (
				<p className={styles.empty}>No exhibitions were found...</p>
			)}

			<section className={styles.exhibitions}>
				{shownExhibitions?.map((exhibition, i) => (
					<ExhibitionCard
						key={`${i}-${exhibition.id}`}
						index={i}
						exhibition={exhibition}
						onClick={() => showModal(exhibition.id)}
					/>
				))}
			</section>

			<ExhibitionModal
				isOpen={isModalOpen}
				onClose={closeModal}
				exhibition={currentExhibition}
			/>
		</>
	);
}
