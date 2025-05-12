import useNewsRibbon from "@/hooks/useNewsRibbon";
import styles from "./newsRibbon.module.css";
import { useEffect, useMemo, useRef, useState } from "react";

export default function NewsRibbon() {
    const { data, isError, isLoading } = useNewsRibbon();

    const [text, setText] = useState<string | null>(null);

    useEffect(() => {
        if(!data || !data.active) return;

        setText(data.text);
    }, [data]);

    const items = useMemo(() => {
        if(!text) return null;

        const length = Math.ceil(500 / text.length);

        return [...Array(length)].map((_, i) => <NewsRibbonItem key={i} text={text} />);
    }, [text]);

    return(
        <div className={`${styles.ribbon} ${(!data || !data.active) ? '' : styles.open}`}>
            <ul className={styles.text}>{items}</ul>
            <ul className={`${styles.text} ${styles.textAlt}`}>{items}</ul>
        </div>
    );
}

interface Props {
    text: string;
}

function NewsRibbonItem({ text }: Props) {
    return(
        <>
            <li>{text}</li>
            <li>●</li>
        </>
    );
}