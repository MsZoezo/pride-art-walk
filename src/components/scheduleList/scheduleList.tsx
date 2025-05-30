import { ScheduleDate } from "@/types/ScheduleDate";
import styles from "./scheduleList.module.css";
import ScheduleItem from "../scheduleItem/scheduleItem";
import { useEffect, useState } from "react";

interface Props {
	schedules: ScheduleDate[];
}

export default function ScheduleList({ schedules }: Props) {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => setOpen(false), [schedules]);

	if (schedules.length == 0) return <p>Closed till further notice</p>;

	return (
		<div>
			<ul className={`${styles.list} ${open ? styles.open : ""}`}>
				{schedules.map((schedule, i) => {
					if (!open && i > 5) return null;
					return (
						<ScheduleItem
							key={schedule.start_time}
							scheduleDate={schedule}
						/>
					);
				})}
			</ul>

			{schedules.length > 5 && (
				<button
					className={styles.button}
					onClick={() => setOpen(prev => !prev)}
				>
					{open ? "See less" : "See more"}
				</button>
			)}
		</div>
	);
}
