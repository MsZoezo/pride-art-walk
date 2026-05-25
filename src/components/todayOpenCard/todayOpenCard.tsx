import { IExhibition } from "@/types/IExhibition";
import { IScheduleDate } from "@/types/IScheduleDate";
import styles from "./todayOpenCard.module.css";
import { CSSProperties } from "react";

interface Props {
	exhibition: IExhibition;
	todaySchedule: IScheduleDate;
	onClick?: () => void;
	index: number;
}

const timeOptions: Intl.DateTimeFormatOptions = {
	hour: "numeric",
	minute: "numeric",
	hour12: false,
};

function formatTime(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-US", timeOptions);
}

export default function TodayOpenCard({ exhibition, todaySchedule, onClick, index }: Props) {
	return (
		<article
			onClick={onClick}
			className={styles.card}
			style={{ "--stagger": `${index * 100}ms` } as CSSProperties}
		>
			<div className={styles.content}>
				<p className={styles.time}>
					{formatTime(todaySchedule.start_time)} - {formatTime(todaySchedule.end_time)}
				</p>
				<h3 className={styles.title}>{exhibition.title}</h3>
				<p className={styles.location}>{exhibition.venue_name}</p>
			</div>
			<button className={styles.button}>
				Read more{" "}
				<img src="/arrow-right.svg" alt="" />
			</button>
		</article>
	);
}
