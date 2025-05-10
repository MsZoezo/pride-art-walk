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
import MapFilter from "@/components/filters/mapFilter"
import useExhibitions from "@/hooks/useExhibitions";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import { Tag } from "@/types/Tag";
import Legend from "@/components/legend/legend";
import Map from "@/components/map";

export default function Home() {
    // const exhibitions = useExhibitionsContext();
    const { exhibitions, isError, isLoading, retryTime } = useExhibitions();
    const [ isMapLoading, setIsMapLoading ] = useState<boolean>(true);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const shownExhibitions = useMemo(() => {
        if(!exhibitions) return [];

        let shownExhibitions = [...exhibitions];

        if(selectedTags.length == 0) return shownExhibitions;

        if(selectedTags.length != 0) {
            shownExhibitions = shownExhibitions.filter(exhibition => {
                for(let i = 0; i < selectedTags.length; i++) {
                    if(!exhibition.tags.find(tag => tag.id === selectedTags[i])) continue;
    
                    return true;
                }
                return false;
            });
        }

        return shownExhibitions;
    }, [exhibitions, selectedTags]);

    useEffect(() => {
        let protocol = new Protocol();

        maplibregl.addProtocol("pmtiles", protocol.tile);
        
        return () => {
          maplibregl.removeProtocol("pmtiles");
        };
    }, []);

    return (
        <section className={styles.content}>
            <LoadingScreen render={isLoading || isMapLoading} error={isError} retryTime={retryTime} />

            <MapNavigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/news">News</Link>
            </MapNavigation>

            <Map exhibitions={shownExhibitions} setIsMapLoading={setIsMapLoading}></Map>
            
            <Mascot />

            <div className={styles.mapIcons}>
                <Legend />
                <MapFilter onSelect={val => setSelectedTags(val)}/>
            </div>
        </section>
    )
}