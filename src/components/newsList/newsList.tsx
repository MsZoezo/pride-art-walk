import { useListContext } from "@/context/ListContextProvider";
import styles from "./newsList.module.css";
import { useMemo } from "react";
import { INews } from "@/types/INews";
import NewsCard from "../newsCard/newsCard";
import NewsModal from "../modals/newsModal/newsModal";
import useModalParams from "@/hooks/useModalParams";

interface Props {
	news: INews[];
}

export default function NewsList({ news }: Props) {
	const { selectedTags, searchString } = useListContext()!;

	const { showModal, closeModal, isOpen, currentItem } = useModalParams<INews>(
		"news",
		"/news",
		news,
	);

	const shownNews = useMemo(() => {
		if (!news) return;

		let shownNews = [...news];

		if (selectedTags.length == 0 && (!searchString || searchString.length == 0)) {
			return shownNews;
		}

		if (selectedTags.length != 0) {
			shownNews = shownNews.filter(news => {
				for (let i = 0; i < selectedTags.length; i++) {
					if (!news.tags.find(tag => tag.id === selectedTags[i])) continue;

					return true;
				}
				return false;
			});
		}

		if (searchString)
			shownNews = shownNews.filter(news =>
				news.title.toLowerCase().includes(searchString.toLowerCase()),
			);

		return shownNews;
	}, [news, selectedTags, searchString]);

	return (
		<>
			{searchString?.length != 0 && shownNews?.length == 0 && (
				<p className={styles.empty}>No news was found...</p>
			)}

			<section className={styles.news}>
				{shownNews?.map((news, i) => (
					<NewsCard
						key={`${i}-${news.id}`}
						index={i}
						news={news}
						onClick={() => showModal(news.slug)}
					/>
				))}
			</section>

			<NewsModal
				isOpen={isOpen}
				onClose={closeModal}
				news={currentItem}
			/>
		</>
	);
}
