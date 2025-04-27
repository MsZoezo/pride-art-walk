"use client"

import styles from "./page.module.css";

import MapNavigation from '@/components/mapNavigation/mapNavigation'
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'

import Link from 'next/link'
import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from 'react'
import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import { Exhibition } from '@/types/Exhibition';
import Mascot from "@/components/mascot/mascot";
import useExhibitions from "@/hooks/useExhibitions";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";

export default function Home() {
    // const exhibitions = useExhibitionsContext();
    const { exhibitions, isError, isLoading } = useExhibitions();
    
    const Map = dynamic(() => import("@/components/map"), { ssr: false });

    if(isLoading) return <LoadingScreen />;

    return (
        <section className={styles.content}>
            <MapNavigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </MapNavigation>

            <Map exhibitions={exhibitions} zoom={13}></Map>
            

            <Mascot />
        </section>
    )
}