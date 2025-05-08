import { useState } from "react";
import styles from "./legend.module.css";
import Color from "./color/color";

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
                <Color color="#829fae" name="Closed exhibition" />
                <Color color="#ffde00" name="Open exhibition" />
                <Color color="#c3e1cc" name="Your location" />
            </ul>
        </section>
    );
}