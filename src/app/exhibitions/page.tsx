"use client";

import Navigation from "@/components/navigation/navigation";
import TagFilter from "@/components/filters/tagFilter";
import TextFilter from "@/components/filters/textFilter";
import Link from "next/link";

import styles from "./page.module.css"
import useExhibitions from "@/hooks/useExhibitions";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import ExhibitionList from "@/components/exhibitionList/exhibitionList";
import { ListContextProvider } from "@/context/ListContextProvider";

export default function Exhibitions() {
    const { exhibitions, isError, isLoading, retryTime } = useExhibitions();

    return(
        <main className={styles.main}>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/news">News</Link>
            </Navigation>

            <LoadingScreen render={isLoading || isError} error={isError} retryTime={retryTime} />

            <h1 className={styles.title}>Exhibitions</h1>

            <ListContextProvider>
                <section className={styles.filters}>
                    <TextFilter />
                    <TagFilter contentType="exhibitions"/>
                </section>

                <ExhibitionList exhibitions={exhibitions ?? []} />
            </ListContextProvider>
        </main>
    );
}