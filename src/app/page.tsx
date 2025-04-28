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
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";

export default function Home() {
    // const exhibitions = useExhibitionsContext();
    const { exhibitions, isError, isLoading } = useExhibitions();
    const [ isMapLoading, setIsMapLoading ] = useState<boolean>(true);
    
    const Map = dynamic(() => import("@/components/map"), { ssr: false });

    useEffect(() => {
        let protocol = new Protocol();

        maplibregl.addProtocol("pmtiles", protocol.tile);
        
        return () => {
          maplibregl.removeProtocol("pmtiles");
        };
    }, []);

    return (
        <section className={styles.content}>

            <LoadingScreen render={isLoading || isMapLoading}/>;

            <MapNavigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </MapNavigation>

            { exhibitions && <Map exhibitions={exhibitions} setIsMapLoading={setIsMapLoading}></Map> }
            
            <Mascot />
        </section>
    )
}