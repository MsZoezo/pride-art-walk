"use client";

import Navigation from "@/components/navigation/navigation";
import AboutUsArticle from "@/components/aboutUsArticle/aboutUsArticle";
import PartnerList from "@/components/partnerList/partnerList";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import useAbout from "@/hooks/useAbout";
import Link from "next/link";

import styles from "./page.module.css";
import TeamList from "@/components/teamList/teamList";

/**
 * The about us page.
 */
export default function About() {
	const { data, isLoading, isError, retryTime } = useAbout();

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

			<section className={styles.aboutSection}>
				<AboutUsArticle
					text={data?.description}
					email={data?.email}
					image={data?.image}
				/>
				<TeamList teams={data?.teams} />
			</section>

			<PartnerList partners={data?.partners} />
		</main>
	);
}
