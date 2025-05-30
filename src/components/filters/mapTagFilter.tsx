import { SetStateAction, Dispatch, CSSProperties } from "react";
import styles from "./mapTagFilter.module.css";
import useTags from "@/hooks/useTags";
import { useMapContext } from "@/context/MapContextProvider";

interface Props {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MapTagFilter({ isOpen, setOpen }: Props) {
	const { tags } = useTags("exhibitions");
	const { selectedTags, setSelectedTags } = useMapContext()!;

	const onClick = (id: number) => {
		setSelectedTags(prev =>
			prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id],
		);
	};

	return (
		<>
			<div className={`${styles.popup} ${isOpen ? styles.open : ""}`}>
				<div className={styles.inner}>
					<div className={styles.bar}>
						<h2>Filters</h2>
						<button
							onClick={() => setOpen(false)}
							className={styles.closeButton}
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>

					<div className={styles.tags}>
						{tags?.map((tag, i) => (
							<button
								key={`filter-${i}`}
								onClick={() => onClick(tag.id)}
								className={`${styles.button} ${selectedTags.includes(tag.id) ? styles.selected : ""}`}
								style={{ "--stagger": `${i * 100}ms` } as CSSProperties}
							>
								{tag.name}
							</button>
						))}
					</div>

					{selectedTags.length != 0 && (
						<button
							onClick={() => setSelectedTags([])}
							className={styles.reset}
						>
							Reset filters
						</button>
					)}
				</div>
			</div>
		</>
	);
}
