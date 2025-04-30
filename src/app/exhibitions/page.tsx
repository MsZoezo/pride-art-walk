"use client";

import Navigation from "@/components/navigation/navigation";
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'
import TagFilter from "@/components/filters/tagFilter";
import TextFilter from "@/components/filters/textFilter";
import Link from "next/link";

import { useContext, useEffect, useMemo, useState } from 'react'
import { getTags, showExhibition } from "@/util/fetch/tags";
import { Exhibition } from '@/types/Exhibition';
import { Tag } from "@/types/Tag";
import styles from "./page.module.css"
import ExhibitionCard from "@/components/exhibitionCard/exhibitionCard";
import useExhibitions from "@/hooks/useExhibitions";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import ExhibitionList from "@/components/exhibitionList/exhibitionList";
import { ListContextProvider } from "@/context/ListContextProvider";

export default function Exhibitions() {
    const { exhibitions, isError, isLoading } = useExhibitions();

    return(
        <main className={styles.main}>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </Navigation>

            <LoadingScreen render={isLoading} />

            <h1>Exhibitions</h1>

            <ListContextProvider>
                <section className={styles.filters}>
                    <TextFilter />
                    <TagFilter />
                </section>

                <ExhibitionList exhibitions={exhibitions} />
            </ListContextProvider>
        </main>
    );
}