import { useListContext } from "@/context/ListContextProvider";
import styles from "./newsList.module.css";
import { useEffect, useMemo, useState } from "react";
import { INews } from "@/types/INews";
import NewsCard from "../newsCard/newsCard";
import NewsModal from "../modals/newsModal/newsModal";
import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams } from "next/navigation";
import { ModalWindowState } from "@/util/modals";

interface Props {
	news: INews[];
}

export default function NewsList({ news }: Props) {
	const params = useSearchParams();

	const { showModal, closeModal } = ModalWindowState("news", "/news");
	const { selectedTags, searchString } = useListContext()!;

	const [currentNewsItem, setCurrentNewsItem] = useState<INews | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const id = params.get("news");

		if (!id) {
			setIsModalOpen(false);
			return;
		}

		const newsItem = news?.find(val => val.id === Number(id));

		if (newsItem === currentNewsItem && isModalOpen) return;

		if (!newsItem) {
			setIsModalOpen(false);
			return;
		}

		setCurrentNewsItem(newsItem);
		setIsModalOpen(true);
	}, [params, news]);

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
						onClick={() => showModal(news.id)}
					/>
				))}
			</section>

			<NewsModal
				isOpen={isModalOpen}
				onClose={closeModal}
				news={currentNewsItem}
			/>
		</>
	);
}
