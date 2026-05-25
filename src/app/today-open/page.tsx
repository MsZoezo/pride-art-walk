"use client";

import Navigation from "@/components/navigation/navigation";
import Link from "next/link";

import styles from "./page.module.css";
import useTodayOpenExhibitions from "@/hooks/useTodayOpenExhibitions";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import TodayOpenList from "@/components/todayOpenList/todayOpenList";

/**
 * The today open exhibitions page.
 */
export default function TodayOpen() {
	const { exhibitions, isError, isLoading, retryTime } = useTodayOpenExhibitions();

	return (
		<main className={styles.main}>
			<Navigation>
				<Link href="/">Home</Link>
				<Link href="/exhibitions">Exhibitions</Link>
				<Link href="/news">News</Link>
				<Link href="/about">About</Link>
			</Navigation>

			<LoadingScreen
				render={isLoading || isError}
				error={isError}
				retryTime={retryTime}
			/>

			<h1 className={styles.title}>Open Today</h1>
			<p className={styles.subtitle}>
				Exhibitions that are open today
			</p>

			<TodayOpenList exhibitions={exhibitions ?? []} />
		</main>
	);
}
