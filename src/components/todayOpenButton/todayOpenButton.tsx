import Link from "next/link";
import styles from "./todayOpenButton.module.css";

export default function TodayOpenButton() {
	return (
		<Link
			href="/today-open"
			className={styles.button}
		>
			<img src="/now.svg" alt="Now open" />
		</Link>
	);
}
