"use client";

import { IExhibition } from "@/types/IExhibition";
import styles from "./exhibitionList.module.css";
import ExhibitionCard from "../exhibitionCard/exhibitionCard";
import { useMemo } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useListContext } from "@/context/ListContextProvider";
import useModalParams from "@/hooks/useModalParams";

interface Props {
	exhibitions: IExhibition[];
}

export default function ExhibitionList({ exhibitions }: Props) {
	const { selectedTags, searchString } = useListContext()!;

	const { showModal, closeModal, isOpen, currentItem } = useModalParams<IExhibition>(
		"exhibition",
		"/exhibitions",
		exhibitions,
	);

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
					exhibition.description?.toLowerCase().includes(lowerSearch) ||
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
						onClick={() => showModal(exhibition.slug)}
					/>
				))}
			</section>

			<ExhibitionModal
				isOpen={isOpen}
				onClose={closeModal}
				exhibition={currentItem}
			/>
		</>
	);
}
