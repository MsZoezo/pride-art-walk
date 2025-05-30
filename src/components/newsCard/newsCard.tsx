import { News } from "@/types/News";
import styles from "./newsCard.module.css";
import { CSSProperties } from "react";
import Tag from "../tag/tag";
import { useMemo } from "react";
import { toPreview } from "@/util/description";
interface Props {
	news: News;
	onClick?: any;
	index: number;
}

export default function NewsCard({ news, onClick, index }: Props) {
	const description = toPreview(news.description);

	const date = new Date(news.date).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return (
		<article
			onClick={onClick}
			className={styles.card}
			style={{ "--stagger": `${index * 100}ms` } as CSSProperties}
		>
			{news.image && (
				<figure className={styles.image}>
					<img
						src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${news.image}`}
						alt={news.image_alt}
					/>
				</figure>
			)}

			<div className={styles.content}>
				<h3 className={styles.title}>{news.title}</h3>
				<h4 className={styles.date}>{date}</h4>

				<ul className={styles.tags}>
					{news.tags.map((tag, i) => (
						<Tag
							key={`${news.title}-tags-${i}`}
							text={tag.name}
							id={tag.id}
							index={i}
						/>
					))}
				</ul>

				{description && <p>{description}</p>}

				<button className={styles.button}>
					Read more{" "}
					<img
						src="/arrow-right.svg"
						alt=""
					/>
				</button>
			</div>
		</article>
	);
}
