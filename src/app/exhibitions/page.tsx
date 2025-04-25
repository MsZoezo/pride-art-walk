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
import styles from "./page.module.css"
import ExhibitionCard from "@/components/exhibitionCard/exhibitionCard";
import { useExhibitionsContext } from "@/context/ExhibitionsContextProvider";

export default function Exhibitions() {
    const exhibitions = useExhibitionsContext();
    const [tags, setTags] = useState<any>([]);
    const [showTags, setTagVisibility] = useState(false);
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const allTags = await getTags();
            setTags(allTags);
        })();
    }, [])
    
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

            <section className={styles.exhibitions}>
                {
                    exhibitions?.map((exhibition) => (
                        <ExhibitionCard key={exhibition.id} exhibition={exhibition} onClick={() => showModal(exhibition)}/>
                    ))
                }
            </section>

            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />
        </main>
    );
}