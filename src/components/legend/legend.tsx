import { useState } from "react";
import styles from "./legend.module.css";
import Color from "./color/color";
import { colors } from "@/util/theme";

const openDefault = process.env.NEXT_PUBLIC_LEGEND_OPEN.toLowerCase() === 'true';

export default function Legend() {
    const [isOpen, setIsOpen] = useState<boolean>(openDefault);

    return(
        <section className={`${styles.legend} ${isOpen ? styles.open : ''}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>Legend</h2>
                <button className={styles.button} onClick={() => setIsOpen(prev => !prev)}>
                    <img src={isOpen ? '/close.svg' : '/legend.svg'} alt="" />
                </button>
            </div>
            <ul className={styles.list}>
                <Color color={colors.exhibition_closed} name="Closed exhibition" />
                <Color color={colors.exhibition_open} name="Open exhibition" />
                <Color color={colors.user_location} name="Your location" />
            </ul>
        </section>
    );
}