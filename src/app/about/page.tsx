"use client"

import Navigation from "@/components/navigation/navigation";
import AboutUsArticle from "@/components/aboutUsArticle/aboutUsArticle";
import AboutContactArticle from "@/components/aboutContactArticle/aboutContactArticle";
import PartnerList from "@/components/partnerList/partnerList";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import useAbout from "@/hooks/useAbout";
import Link from "next/link";

import styles from "./page.module.css"
import TeamList from "@/components/teamList/teamList";

export default function About() {
    const { description, email, partners, teams, isLoading, isError, retryTime } = useAbout();
    return (
        <main className={styles.main}>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/news">News</Link>
                <Link href="/about">About</Link>
            </Navigation>

            <LoadingScreen render={isLoading || isError} error={isError} retryTime={retryTime} />

            <h1 className={styles.title}>About us</h1>

            <section className={styles.aboutSection}>
                <AboutUsArticle text={description}/>
                <div className={styles.sectionRight}>
                    <AboutContactArticle email={email}/>
                    <TeamList teams={teams}/>
                </div>
            </section>

            <PartnerList partners={partners}/>
        </main>
    )
}