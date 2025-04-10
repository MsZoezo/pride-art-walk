import { ReactNode, useState } from "react";
import styles from "./navigation.module.css";
import NavigationModal from "../modals/navigationModal/navigationModal";
import Link from "next/link";

interface Props {
    children: ReactNode;
}

export default function Navigation({ children }: Props) {
    const [ isOpen, setOpen ] = useState<boolean>(false);

    return(
        <>
            <div className={styles.navigation}>

                <figure className={styles.logo}>
                    <img src="/logo.png" alt="" />
                </figure>

                <nav className={styles.links}>
                    {children}
                </nav>

                <button onClick={() => setOpen(true)} className={styles.hamburger}>
                    <svg className={styles.background} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="inherit" d="M54.6,-64.8C68.7,-53.3,76.5,-34.1,80.5,-13.9C84.4,6.3,84.5,27.6,73.3,38.1C62.2,48.7,39.9,48.6,20.6,54.8C1.4,61,-15,73.5,-28,71.2C-41,68.9,-50.8,51.9,-60.5,35C-70.3,18,-80.1,1.1,-76.7,-12.7C-73.3,-26.4,-56.6,-37,-41.6,-48.3C-26.6,-59.7,-13.3,-71.8,3.5,-75.9C20.3,-80.1,40.5,-76.3,54.6,-64.8Z" transform="translate(100 100)" />
                    </svg>

                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L4 7" stroke="inherit" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M20 12L4 12" stroke="inherit" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M20 17L4 17" stroke="inherit" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
            
            <NavigationModal isOpen={isOpen} setOpen={setOpen}>
                {children}
            </NavigationModal>
        </>
    );
}