import { IExhibition } from "@/types/IExhibition";
import styles from "./exhibitionCard.module.css";
import Tag from "../tag/tag";
import { CSSProperties } from "react";
import { toPreview } from "@/util/description";

interface Props {
	exhibition: IExhibition;
	onClick?: () => void;
	selectedTags?: number[];
	index: number;
}

export default function ExhibitionCard({ exhibition, onClick, index }: Props) {
	const description = toPreview(exhibition.description);

	return (
		<article
			onClick={onClick}
			className={styles.card}
			style={{ "--stagger": `${index * 100}ms` } as CSSProperties}
		>
			{exhibition.image && (
				<figure className={styles.image}>
					<img
						src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${exhibition.image}`}
						alt={exhibition.image_alt}
					/>
				</figure>
			)}

			<div className={styles.content}>
				<h3 className={styles.title}>{exhibition.title}</h3>

				<ul className={styles.tags}>
					{exhibition.tags.map((tag, i) => (
						<Tag
						key={`${exhibition.title}-tags-${i}`}
						text={tag.name ?? undefined}
						image={tag.image}
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
