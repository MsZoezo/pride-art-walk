import styles from "./navigation.module.css";

import NavigationModal from "../modals/navigationModal/navigationModal";
import { ReactNode, useState } from "react";

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