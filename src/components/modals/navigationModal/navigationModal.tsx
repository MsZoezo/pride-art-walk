import { Dispatch, ReactNode, SetStateAction } from "react";
import BaseModal from "../baseModal/baseModal";
import styles from "./navigationModal.module.css";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

    children: ReactNode;
}

export default function NavigationModal({ isOpen, setOpen, children }: Props) {
    return(
        <BaseModal isOpen={isOpen} setOpen={setOpen}>
            <svg className={styles.blobGreen} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="inherit" d="M42.6,-54.7C53.5,-41.6,59.5,-26.6,61.2,-11.6C62.8,3.3,60,18.2,51.9,27.9C43.9,37.7,30.5,42.2,18.6,43C6.8,43.7,-3.4,40.5,-18.6,39.9C-33.9,39.2,-54.1,41.1,-58.4,33.7C-62.6,26.3,-50.8,9.7,-48.5,-9.4C-46.1,-28.5,-53.2,-50.2,-46.7,-64C-40.2,-77.9,-20.1,-84,-2.1,-81.5C15.8,-79,31.7,-67.8,42.6,-54.7Z" transform="translate(100 100)" />
            </svg>

            <svg className={styles.blobLightGreen} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="inherit" d="M35.9,-38.2C50.8,-30.3,70.1,-23,76.4,-10.1C82.8,2.9,76.2,21.6,66.9,39.6C57.6,57.6,45.6,74.9,28.5,83.2C11.5,91.5,-10.6,90.7,-23.1,79.3C-35.5,67.9,-38.2,45.8,-46.5,28.3C-54.8,10.9,-68.7,-1.8,-70.7,-16.3C-72.7,-30.8,-63,-47.1,-49.2,-55.3C-35.5,-63.4,-17.7,-63.4,-3.6,-59.1C10.5,-54.8,21,-46.2,35.9,-38.2Z" transform="translate(100 100)" />
            </svg>

            <svg className={styles.blobOrange} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="inherit" d="M43,-77.9C53.4,-68.5,58,-52.3,61.1,-38.2C64.3,-24,66,-12,63.2,-1.6C60.4,8.8,53,17.5,49.1,30.5C45.3,43.4,45.1,60.5,37.5,72.5C29.9,84.5,14.9,91.4,1.1,89.4C-12.6,87.4,-25.3,76.5,-36.7,66.7C-48.1,57,-58.3,48.3,-67.7,37.3C-77.1,26.4,-85.7,13.2,-83,1.6C-80.2,-10,-66.1,-20,-57.7,-32.7C-49.3,-45.4,-46.7,-60.8,-38,-71.3C-29.3,-81.7,-14.7,-87.2,0.8,-88.7C16.3,-90.1,32.6,-87.4,43,-77.9Z" transform="translate(100 100)" />
            </svg>

            <svg className={styles.blobRed} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="inherit" d="M44.6,-51.2C60.4,-49.9,77.6,-40.4,78.8,-27.7C80,-15.1,65.2,0.6,56.8,15.9C48.4,31.2,46.3,46.1,37.9,57.7C29.5,69.3,14.8,77.6,1.7,75.2C-11.3,72.8,-22.6,59.7,-32.6,48.7C-42.6,37.6,-51.3,28.6,-53.1,18.4C-54.9,8.2,-49.7,-3.1,-46.7,-16.1C-43.8,-29.1,-43.1,-43.8,-35.7,-47.8C-28.3,-51.9,-14.2,-45.3,0.1,-45.4C14.4,-45.6,28.8,-52.5,44.6,-51.2Z" transform="translate(100 100)" />
            </svg>


            <nav className={styles.navigation}>
                {children}
            </nav>
        </BaseModal>
    );
}