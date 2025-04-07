import { Dispatch, SetStateAction } from "react";
import BaseModal from "../baseModal/baseModal";
import styles from "./navigationModal.module.css";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavigationModal({ isOpen, setOpen }: Props) {
    return(
        <BaseModal isOpen={isOpen} setOpen={setOpen}>
            {/* <svg className={styles.blobGreen} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#00983A" d="M42.6,-54.7C53.5,-41.6,59.5,-26.6,61.2,-11.6C62.8,3.3,60,18.2,51.9,27.9C43.9,37.7,30.5,42.2,18.6,43C6.8,43.7,-3.4,40.5,-18.6,39.9C-33.9,39.2,-54.1,41.1,-58.4,33.7C-62.6,26.3,-50.8,9.7,-48.5,-9.4C-46.1,-28.5,-53.2,-50.2,-46.7,-64C-40.2,-77.9,-20.1,-84,-2.1,-81.5C15.8,-79,31.7,-67.8,42.6,-54.7Z" transform="translate(100 100)" />
            </svg> */}


            <nav className={styles.navigation}>
                <Link href="/">Home</Link>
                <Link href="/">Expositions</Link>
                <Link href="/">News</Link>
                <Link href="/">About</Link>
            </nav>
        </BaseModal>
    );
}