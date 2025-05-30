import { ScheduleDate } from "@/types/ScheduleDate";
import styles from "./scheduleItem.module.css";

interface Props {
	scheduleDate: ScheduleDate;
}

const dateOptions: Intl.DateTimeFormatOptions = {
	weekday: "short",
	month: "short",
	day: "numeric",
};

const timeOptions: Intl.DateTimeFormatOptions = {
	hour: "numeric",
	minute: "numeric",
	hour12: false,
};

export default function ScheduleItem({ scheduleDate }: Props) {
	const day = new Date(scheduleDate.start_time * 1000).toLocaleDateString("en-US", dateOptions);
	const open = new Date(scheduleDate.start_time * 1000).toLocaleTimeString("en-US", timeOptions);
	const end = new Date(scheduleDate.end_time * 1000).toLocaleTimeString("en-US", timeOptions);

	return (
		<li className={styles.item}>
			<div className={styles.time}>
				<p className={styles.day}>{day}</p>
				<p>
					{open} - {end}
				</p>
			</div>

			{scheduleDate.is_special_event && (
				<p className={styles.special}>{scheduleDate.special_event_description}</p>
			)}
		</li>
	);
}
