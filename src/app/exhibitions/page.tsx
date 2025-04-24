"use client";

import Navigation from "@/components/navigation/navigation";
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'
import TagFilter from "@/components/filters/tagFilter";
import Link from "next/link";

import { useContext, useEffect, useState } from 'react'

import { getExhibitions } from '@/util/fetch/map/exhibitions';
import { getTags } from "@/util/fetch/tags";
import { Exhibition } from '@/types/Exhibition';
import { Tag } from "@/types/Tag";
import ExhibitionListItem from "@/components/exhibitionList/exhibitionListItem";
import styles from "./page.module.css"

export default function Exhibitions() {
    const [exhibitions, setExhibitions] = useState<Exhibition[] | null>(null);
    const [tags, setTags] = useState<any>([]);
    const [showTags, setTagVisibility] = useState(false);
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const allTags = await getTags();
            setTags(allTags);
            await fetchData()
        })();
    }, [])

    async function fetchData(Tags?: Tag[]) {
        console.log(Tags)
        const exhibitions: Exhibition[] = await getExhibitions(Tags);
        setExhibitions(exhibitions);
    }
    const showModal = (exhibition: Exhibition) => {
        setCurrentExhibition(exhibition)
        setIsModalOpen(true)
    }

    return(
        <main className={styles.main}>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </Navigation>
            <h1>Exhibitions</h1>
            <section>
                <button onClick={() => setTagVisibility(!showTags)}>show/hide</button>
                {
                    showTags && (
                        <TagFilter tags={tags} onSelected={fetchData}/>
                    )
                }
            </section>

            <br />
            <section>
                {
                    exhibitions?.map((exhibition) => (
                        <ExhibitionListItem key={exhibition.id} exhibition={exhibition} onClick={() => showModal(exhibition)}/>
                    ))
                }
            </section>

            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />
        </main>
    );
}