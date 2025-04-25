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

                <svg className={styles.blobRight} width="201" height="198" viewBox="0 0 201 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M157.332 -54.1182C180.146 -56.1512 201.602 -58.6332 219.252 -51.2858C236.901 -43.9384 250.443 -26.7606 264.429 -6.71436C278.567 13.1804 292.998 35.7931 284.798 50.3182C276.596 65.1455 245.309 72.0377 228.297 103.205C211.135 134.221 208.096 189.663 194.027 196.805C179.959 203.947 155.011 162.637 122.449 141.892C89.8864 121.147 49.8608 120.816 25.7505 102.16C1.64123 83.2014 -6.70329 45.7679 6.07095 17.3328C18.8443 -10.8002 52.7363 -29.9349 81.6168 -40.1428C110.649 -50.5021 134.669 -51.9346 157.332 -54.1182Z" fill="#D0EBFC" fill-opacity="0.4"/>
                </svg>

                <svg className={styles.blobLeft} width="240" height="161" viewBox="0 0 240 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M123.522 -36.2885C154.909 -15.346 201.29 -12.9526 223.681 8.38884C246.072 29.5308 244.472 69.8202 224.68 96.148C205.088 122.476 167.304 135.041 136.716 145.812C105.929 156.782 82.5383 166.156 65.1453 157.779C47.7524 149.202 36.3571 123.074 7.96861 111.506C-20.4198 99.9376 -66.2012 102.929 -90.7912 85.1781C-115.581 67.6263 -119.58 29.5308 -97.7884 10.9817C-76.1972 -7.56736 -29.0163 -6.57009 1.37128 -27.9115C31.7589 -49.2529 45.3534 -92.9331 60.3473 -94.9276C75.5411 -96.9221 91.9344 -57.231 123.522 -36.2885Z" fill="#C3E1CC" fill-opacity="0.4"/>
                </svg>



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