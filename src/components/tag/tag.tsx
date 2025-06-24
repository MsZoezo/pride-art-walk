import { useListContext } from "@/context/ListContextProvider";
import styles from "./tag.module.css";

interface Props {
	text?: string | null;
	image?: string | null;
	id: number;
	index?: number;
}

const colours = ["#F7C3DC66", "#D0EBFC66", "#C3E1CC66", "#829FAE66"];
const imageBaseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL;

export default function Tag({ text, image, id, index }: Props) {
	const { selectedTags } = useListContext() ?? {};
	const background = colours[(index ?? 0) % colours.length];
	const isSelected = selectedTags?.includes(id);

	return (
		<li
			className={`${styles.tag} ${isSelected ? styles.selected : ""}`}
			style={{ background }}
		>
			{image ? (
				<img
					src={`${imageBaseUrl}/${image}`}
					alt={text ?? "Tag icon"}
					className={styles.image}
				/>
			) : (
				<span className={styles.text}>{text}</span>
			)}
		</li>
	);
}
