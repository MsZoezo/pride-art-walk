"use client";

import Navigation from "@/components/navigation/navigation";
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'
import TagFilter from "@/components/filters/tagFilter";
import Link from "next/link";

import { useContext, useEffect, useMemo, useState } from 'react'
import { getTags, showExhibition } from "@/util/fetch/tags";
import { Exhibition } from '@/types/Exhibition';
import { Tag } from "@/types/Tag";
import styles from "./page.module.css"
import ExhibitionCard from "@/components/exhibitionCard/exhibitionCard";
import { SelectedTagsProvider } from "@/context/SelectedTagsContextProvider";
import useExhibitions from "@/hooks/useExhibitions";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import ExhibitionList from "@/components/exhibitionList/exhibitionList";

export default function Exhibitions() {
    // const exhibitions = useExhibitionsContext();
    const { exhibitions, isError, isLoading } = useExhibitions();

    return(
        <main className={styles.main}>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </Navigation>

            <LoadingScreen render={isLoading} />

            <h1 className={styles.title}>Exhibitions</h1>

            <SelectedTagsProvider>
                <section className={styles.filters}>
                    <TagFilter />
                </section>

                <ExhibitionList exhibitions={exhibitions} />
            </SelectedTagsProvider>
        </main>
    );
}