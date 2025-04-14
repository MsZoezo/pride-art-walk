import { Dispatch, ReactNode, SetStateAction } from "react";
import BaseModal from "../baseModal/baseModal";
import styles from "./exhibitionModal.module.css";
import { Exhibition } from "@/types/Exhibition";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

    exhibition: Exhibition | null;
}

export default function ExhibitionModal({ isOpen, setOpen, exhibition }: Props) {
    if(!exhibition) return;

    console.log(exhibition);
    return(
        <BaseModal isOpen={isOpen} setOpen={setOpen}>
            <h2 className={styles.title}>{exhibition.title}</h2>
            <h3 className={styles.venue}>{exhibition.venue_name}</h3>
            
            <ul className={styles.tags}>
                {exhibition.tags.map((tag, i) => <li key={`${exhibition.title}-tags-${i}`}>{tag}</li>)}
            </ul>

            <figure className={styles.image}>
                <img src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${exhibition.image}`} alt="" />
            </figure>

            <div className={styles.description} dangerouslySetInnerHTML={{__html: exhibition.description}} />
        
            <div className={styles.cta}>
                <Link href="/">How to get there</Link>
            </div>
        </BaseModal>
    );
}