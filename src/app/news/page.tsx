"use client";

import Navigation from "@/components/navigation/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { ListContextProvider } from "@/context/ListContextProvider";
import TextFilter from "@/components/filters/textFilter";
import TagFilter from "@/components/filters/tagFilter";
import NewsList from "@/components/newsList/newsList";
import useNews from "@/hooks/useNews";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";

/**
 * The news list page.
 */
export default function News() {
	const { news, isLoading, isError, retryTime } = useNews();

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

			<h1 className={styles.title}>News</h1>

			<ListContextProvider>
				<section className={styles.filters}>
					<TextFilter />
					<TagFilter contentType="news" />
				</section>

				<NewsList news={news ?? []} />
			</ListContextProvider>
		</main>
	);
}
