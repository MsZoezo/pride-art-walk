import styles from "./loadingScreen.module.css";
import Mascot from "../mascot/mascot";
import Spinner from "../spinner/spinner";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    render: boolean;

    error?: Error;
    retryTime?: number;
}

export default function LoadingScreen({ render, error, retryTime }: Props) {
    const [ hidden, setHidden ] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    // This minimum loading time should help with images loading in the background (hopefully!)
    const [ minTimeElapsed, setMinTimeElapsed ] = useState<boolean>(false);

    /* skip everything if we don't have to render at all */
    useEffect(() => {
        if(!render) setHidden(true);
    }, []);

    useEffect(() => {
        setTimeout(() => setMinTimeElapsed(true), 1500);
    }, []);

    useEffect(() => {
        if(render || !minTimeElapsed) return;

        const container = ref.current;

        if(!container) return;

        container.classList.add('fading');

        setTimeout(() => {
            setHidden(true);
        }, 2000);
    }, [render, minTimeElapsed]);

    if(hidden) return;

    return(
        <div className={styles.container} ref={ref}>

            <img className={styles.logo} src="/logo.png" alt="" />

            <Spinner color={error ? 'red': undefined} />

            { error && <p className={styles.error}>{error.message} {retryTime != undefined ? `Retrying in ${retryTime} seconds...` : ''}</p> }

            <Mascot />
        </div>
    );
}