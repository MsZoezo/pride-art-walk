import { useMemo, useState } from "react";
import styles from "./mapFilters.module.css";
import { useMapContext } from "@/context/MapContextProvider";
import MapTagFilter from "../filters/mapTagFilter";

export default function MapFilters() {
	const { selectedTags } = useMapContext()!;

	const [open, setOpen] = useState<boolean>(false);

	const amount = useMemo(() => selectedTags.length, [selectedTags]);

	return (
		<>
			<button
				className={styles.button}
				onClick={() => setOpen(prev => !prev)}
			>
				<img
					src="/filter.svg"
					alt=""
				/>

				{amount != 0 && <figure className={styles.counter}>{amount}</figure>}
			</button>

			<MapTagFilter
				isOpen={open}
				setOpen={setOpen}
			/>
		</>
	);
}
