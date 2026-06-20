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

		// Shuffle function
		const shuffle = <T,>(array: T[]): T[] => {
			const shuffled = [...array];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled;
		};

		// Separate open and upcoming exhibitions
		const openExhibitions = exhibitionsWithSchedule.filter(
			item => now >= item.todaySchedule.start_time && now <= item.todaySchedule.end_time
		);
		const upcomingExhibitions = exhibitionsWithSchedule.filter(
			item => now < item.todaySchedule.start_time
		);

		// Shuffle each group and combine (open first, then upcoming)
		return [...shuffle(openExhibitions), ...shuffle(upcomingExhibitions)];
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
