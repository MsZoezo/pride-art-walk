import styles from "./textFilter.module.css";

import { useListContext } from "@/context/ListContextProvider";

export default function TextFilter() {
	const { setSearchString } = useListContext()!;
	const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const string = event.currentTarget.value;

		setSearchString(string);
	};

	return (
		<div className={styles.textFilter}>
			<input
				type="text"
				onKeyUp={handleEvent}
				className={styles.input}
				placeholder="Search..."
			></input>
			<img
				src="/search.svg"
				className={styles.icon}
				alt=""
			/>
		</div>
	);
}
