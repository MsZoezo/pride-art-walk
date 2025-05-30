import { useListContext } from "@/context/ListContextProvider";
import styles from "./tag.module.css";

interface Props {
	text: string;
	id: number;
	index?: number;
}

const colours = ["#F7C3DC66", "#D0EBFC66", "#C3E1CC66", "#829FAE66"];

export default function Tag({ text, id, index }: Props) {
	const { selectedTags } = useListContext() ?? {};

	const background = colours[(index ?? 0) % colours.length];

	const isSelected = selectedTags?.includes(id);

	return (
		<li
			className={`${styles.tag} ${isSelected ? styles.selected : ""}`}
			style={{ background: background }}
		>
			{text}
		</li>
	);
}
