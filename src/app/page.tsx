"use client"

import styles from "./page.module.css";

import MapNavigation from '@/components/mapNavigation/mapNavigation'
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'

import Link from 'next/link'
import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from 'react'
import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import { getExhibitions } from '@/util/fetch/map/exhibitions';
import { Exhibition } from '@/types/Exhibition';
import { useExhibitionsContext } from "@/context/ExhibitionsContextProvider";
import Mascot from "@/components/mascot/mascot";

export default function Home() {
    const exhibitions = useExhibitionsContext();
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
    const Map = dynamic(() => import("@/components/map"), { ssr: false });

    /** Changes the modal to the exhibition identified by id.
     * @param id the exhibition id.
    */
    const changeModal = (id: number) => {
        if (!exhibitions) return;

        const exhibition = exhibitions.find(exhibition => exhibition.id === id);

        if (!exhibition) return;

        setCurrentExhibition(exhibition);
        setIsModalOpen(true);
    }

    return (
        <section className={styles.content}>
            <MapNavigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </MapNavigation>

            <Map exhibitions={exhibitions} zoom={13} onMarkerClick={changeModal}></Map>
            
            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />

            <Mascot />
        </section>
    )
}