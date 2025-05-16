"use client"

import styles from "./page.module.css";

import MapNavigation from '@/components/mapNavigation/mapNavigation'
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'

import Link from 'next/link'
import dynamic from "next/dynamic";

import { useContext, useEffect, useState, useMemo } from 'react'
import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import { Exhibition } from '@/types/Exhibition';
import Mascot from "@/components/mascot/mascot";
import useExhibitions from "@/hooks/useExhibitions";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import { Tag } from "@/types/Tag";
import Legend from "@/components/legend/legend";
import Map from "@/components/map";
import { MapContextProvider } from "@/context/MapContextProvider";
import NewsRibbon from "@/components/newsRibbon/newsRibbon";
import MapFilters from "@/components/mapFilters/mapFilters";

export default function Home() {
    // const exhibitions = useExhibitionsContext();
    const { exhibitions, isError, isLoading, retryTime } = useExhibitions();
    const [ isMapLoading, setIsMapLoading ] = useState<boolean>(true);

    useEffect(() => {
        let protocol = new Protocol();

        maplibregl.addProtocol("pmtiles", protocol.tile);
        
        return () => {
          maplibregl.removeProtocol("pmtiles");
        };
    }, []);

    const loading = isLoading || isMapLoading || isError;

    return (
        <section className={styles.content}>
            <LoadingScreen render={loading} error={isError} retryTime={retryTime} />

            <MapNavigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/news">News</Link>
            </MapNavigation>

            <MapContextProvider>
                <Map exhibitions={exhibitions ?? []} setIsMapLoading={setIsMapLoading}></Map>

                <div className={styles.mapIcons}>
                    <Legend loaded={!loading} />
                    <MapFilters />
                </div>
            </MapContextProvider>
            
            <NewsRibbon />
            <Mascot />
        </section>
    )
}