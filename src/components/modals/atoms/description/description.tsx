import styles from "./description.module.css";

interface Props {
	content?: string;
}

export default function Description({ content }: Props) {
	if (!content) return;

	return (
		<div
			className={styles.description}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}
