import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";
import BaseModal from "../baseModal/baseModal";
import styles from "./exhibitionModal.module.css";
import { Exhibition } from "@/types/Exhibition";
import Link from "next/link";
import { generateMapsLink } from "@/util/navigate/navigate.location";
import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import Tag from "@/components/tag/tag";

interface Props {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

    exhibition: Exhibition | null;
}

export default function ExhibitionModal({ isOpen, setOpen, exhibition }: Props) {
    if (!exhibition) return;
    const position = useUserLocationContext();

    const mapLink = useMemo(()=> {
        if(position) return generateMapsLink(exhibition.location[0], exhibition.location[1], position.position);
        return generateMapsLink(exhibition.location[0], exhibition.location[1]);
    }, [exhibition]) 

    return (
        <BaseModal isOpen={isOpen} setOpen={setOpen}>
            <svg className={styles.blobPink} width="206" height="203" viewBox="0 0 206 203" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M124.861 -46.4092C159.857 -51.6795 185.405 -91.9403 207.936 -98.257C230.167 -104.574 249.38 -76.9461 252.674 -48.7117C255.967 -20.7777 243.79 7.9133 244.081 34.3466C244.22 60.9302 257.127 85.5563 259.218 116.795C261.458 147.883 253.033 185.735 230.65 197.909C208.267 210.383 171.926 197.18 146.1 179.468C120.275 161.756 105.264 139.533 79.587 126.177C54.0599 112.669 18.4668 108.027 6.15784 90.9105C-6.15108 73.7936 4.97453 44.0517 8.29202 9.80712C11.3091 -24.4373 6.36787 -63.0342 26.0444 -67.3974C45.8711 -71.6104 90.0152 -41.2892 124.861 -46.4092Z" fill="#F7C3DC" fillOpacity="0.4" />
            </svg>

            <svg className={styles.blobBlue} width="231" height="302" viewBox="0 0 231 302" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M137.032 -10.1637C157.006 -33.6689 193.678 -37.9182 220.938 -23.7662C248.357 -9.77402 266.524 22.4595 276.357 52.7537C286.191 83.0479 287.53 111.242 291.274 140.242C295.018 169.243 301.006 199.208 286.46 213.755C272.074 228.141 236.993 227.268 210.586 238.586C184.5 249.905 166.77 273.736 138.929 288.415C111.088 303.414 72.9773 309.102 65.5648 287.623C57.9924 266.303 81.2783 217.657 66.6289 182.227C52.1394 146.637 -0.285391 124.264 0.972278 112.734C1.90958 101.203 56.5294 100.515 85.1564 78.6289C114.104 56.744 117.218 13.502 137.032 -10.1637Z" fill="#D0EBFC" fillOpacity="0.4" />
            </svg>

            <svg className={styles.blobGreen} width="189" height="221" viewBox="0 0 189 221" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M140.81 43.6742C163.699 63.8436 190.148 75.7079 188.961 91.9791C187.605 108.081 158.443 128.42 148.44 153.674C138.267 178.928 147.253 209.097 138.776 222.826C130.468 236.555 104.527 233.843 78.9258 233.674C53.3243 233.335 27.8924 235.538 10.4291 224.69C-6.86463 213.843 -16.1897 190.114 -18.3938 167.742C-20.7674 145.199 -16.1897 124.182 -4.32144 110.962C7.54681 97.7418 26.7056 92.4875 41.7952 69.7758C56.8848 46.8945 67.7358 6.72514 82.995 0.792953C98.2541 -5.13923 117.752 23.5047 140.81 43.6742Z" fill="#C3E1CC" fillOpacity="0.4" />
            </svg>

            <svg className={styles.blobBrown} width="224" height="166" viewBox="0 0 224 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M176.379 4.65639C198.145 11.8097 219.77 27.5189 223.421 47.1554C227.072 66.7919 212.749 90.3558 200.392 110.273C188.034 130.19 177.784 146.6 163.32 154.174C148.716 161.749 130.04 160.486 107.151 166.097C84.2623 171.707 57.4416 184.05 42.1356 176.756C26.8295 169.463 23.0381 142.393 14.8936 117.005C6.74915 91.4779 -5.74845 67.4932 2.95774 53.4672C11.6639 39.3008 41.4335 35.093 63.0585 27.9397C84.6836 20.7864 97.8833 10.8279 115.436 5.07718C132.989 -0.813779 154.754 -2.35665 176.379 4.65639Z" fill="#B17F4A" fillOpacity="0.4" />
            </svg>



            <h2 className={styles.title}>{exhibition.title}</h2>
            <h3 className={styles.venue}>{exhibition.venue_name}</h3>

            <ul className={styles.tags}>
                {exhibition.tags.map((tag, i) => <Tag key={`${exhibition.title}-tags-${i}`} text={tag.name} id={tag.id} index={i} />)}
            </ul>

            {/* <ul className={styles.artists}>
                {exhibition.artist_name.map((artist, i) => <li key={`${exhibition.title}-artists-${i}`}>{artist}</li>)}
            </ul>

            <Link href="/" className={styles.route}>
                <figure className={styles.icon}>
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.35 9.05L15.01 16.59C14.45 18.38 11.94 18.41 11.35 16.63L10.65 14.56C10.46 13.99 10.01 13.53 9.44 13.35L7.36 12.65C5.6 12.06 5.62 9.53 7.41 8.99L14.95 6.64C16.43 6.19 17.82 7.58 17.35 9.05Z" fill="#292D32" />
                    </svg>
                </figure>

                Route
            </Link> */}

            <div className={styles.content}>
                <ul>
                    <li className={styles.wwww}>
                        <h4 className={styles.type}>what</h4>
                        <p>{exhibition.title}</p>
                    </li>

                    <li className={styles.wwww}>
                        <h4 className={styles.type}>Who</h4>
                        <ul className={styles.artists}>
                        {exhibition.artist_name.map((artist, i) => <li key={`${exhibition.title}-artists-${i}`}>{artist}{exhibition.artist_name.length - 1 != i ? ',' : ''}</li>)}
                        </ul>
                    </li>

                    <li className={styles.wwww}>
                        <h4 className={styles.type}>Where</h4>
                        <Link href={mapLink} className={styles.route}>{exhibition.address ?? 'Adress'}</Link>
                    </li>

                    <li className={styles.wwww}>
                        <h4 className={styles.type}>When</h4>
                        <p>TODO</p>
                    </li>
                </ul>

                {exhibition.image &&
                    <figure className={styles.image}>
                        <img src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${exhibition.image}`} alt="" />
                    </figure>
                }


                <div className={styles.description} dangerouslySetInnerHTML={{ __html: exhibition.description }} />
            </div>

            <div className={styles.cta}>
                {
                    mapLink ? (
                        <Link href={mapLink}>How to get there</Link>
                    ):
                    null
                }
            </div>
        </BaseModal>
    );
}