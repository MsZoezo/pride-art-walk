"use client";

import { IExhibition } from "@/types/IExhibition";
import { IScheduleDate } from "@/types/IScheduleDate";
import styles from "./todayOpenList.module.css";
import TodayOpenCard from "../todayOpenCard/todayOpenCard";
import { useMemo } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import useModalParams from "@/hooks/useModalParams";

interface Props {
	exhibitions: IExhibition[];
}

interface ExhibitionWithSchedule {
	exhibition: IExhibition;
	todaySchedule: IScheduleDate;
}

function getTodaySchedule(exhibition: IExhibition): IScheduleDate | undefined {
	const today = new Date().toISOString().split("T")[0];
	return exhibition.schedules.find(schedule => schedule.date === today);
}

export default function TodayOpenList({ exhibitions }: Props) {
	const { showModal, closeModal, isOpen, currentItem } = useModalParams<IExhibition>(
		"exhibition",
		"/today-open",
		exhibitions,
	);

	const sortedExhibitions = useMemo(() => {
		if (!exhibitions) return [];

		const now = Math.floor(Date.now() / 1000);

		const exhibitionsWithSchedule: ExhibitionWithSchedule[] = exhibitions
			.map(exhibition => ({
				exhibition,
				todaySchedule: getTodaySchedule(exhibition),
			}))
			.filter((item): item is ExhibitionWithSchedule => item.todaySchedule !== undefined)
			// Filter out exhibitions that have already ended
			.filter(item => now <= item.todaySchedule.end_time);

		// Sort: currently open first, then by start time
		return exhibitionsWithSchedule.sort((a, b) => {
			const aIsOpen = now >= a.todaySchedule.start_time && now <= a.todaySchedule.end_time;
			const bIsOpen = now >= b.todaySchedule.start_time && now <= b.todaySchedule.end_time;

			// Open exhibitions come first
			if (aIsOpen && !bIsOpen) return -1;
			if (!aIsOpen && bIsOpen) return 1;

			// Within same group, sort by start time
			return a.todaySchedule.start_time - b.todaySchedule.start_time;
		});
	}, [exhibitions]);

	return (
		<>
			{sortedExhibitions.length === 0 && (
				<p className={styles.empty}>No exhibitions are open today...</p>
			)}

			<section className={styles.list}>
				{sortedExhibitions.map(({ exhibition, todaySchedule }, i) => (
					<TodayOpenCard
						key={`${i}-${exhibition.id}`}
						index={i}
						exhibition={exhibition}
						todaySchedule={todaySchedule}
						onClick={() => showModal(exhibition.slug)}
					/>
				))}
			</section>

			<ExhibitionModal
				isOpen={isOpen}
				onClose={closeModal}
				exhibition={currentItem}
			/>
		</>
	);
}
