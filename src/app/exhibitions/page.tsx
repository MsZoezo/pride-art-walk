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
import { SelectedTagsProvider } from "@/context/SelectedTagsContextProvider";
import useExhibitions from "@/hooks/useExhibitions";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import ExhibitionList from "@/components/exhibitionList/exhibitionList";

export default function Exhibitions() {
    // const exhibitions = useExhibitionsContext();
    const { exhibitions, isError, isLoading } = useExhibitions();

    const [tags, setTags] = useState<any>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [showTags, setTagVisibility] = useState(false);
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const allTags = await getTags();
            setTags(allTags);
        })();
    }, []);

    const shownExhibitions = useMemo(() => {
        if(!exhibitions) return;

        const allExhibitions = [...exhibitions];

        if(selectedTags.length == 0) {
            return allExhibitions;
        }

        const filteredExhibitions = allExhibitions.filter(exhibition => {
            for(let i = 0; i < selectedTags.length; i++) if(!exhibition.tags.find(tag => tag.id === selectedTags[i])) return false;
            return true;
        });

        return filteredExhibitions;
    }, [exhibitions, selectedTags]);
    
    const showModal = (exhibition: Exhibition) => {
        setCurrentExhibition(exhibition)
        setIsModalOpen(true);
    }

    return(
        <main className={styles.main}>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </Navigation>

            <LoadingScreen render={isLoading} />

            <h1>Exhibitions</h1>

            <section>
                <TextFilter onEnter={setTitleSearchValue}/>
                <button onClick={() => setTagVisibility(!showTags)}>show/hide</button>
                {
                    showTags && (
                        <TagFilter tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    )
                }
            </section>

            <SelectedTagsProvider>
                <section className={styles.filters}>
                    <TagFilter />
                </section>

                <ExhibitionList exhibitions={exhibitions} />
            </SelectedTagsProvider>
        </main>
    );
}