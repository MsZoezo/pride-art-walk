import styles from "./loadingScreen.module.css";
import Mascot from "../mascot/mascot";
import Spinner from "../spinner/spinner";
import { useEffect, useState } from "react";

interface Props {
    render: boolean;
}

export default function LoadingScreen({ render }: Props) {
    // This minimum loading time should help with images loading in the background (hopefully!)
    const [ minTimeElapsed, setMinTimeElapsed ] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setMinTimeElapsed(true), 2000);
    }, []);

    if(!render && minTimeElapsed) return;

    return(
        <div className={styles.container}>

            <img className={styles.logo} src="/logo.png" alt="" />

            <Spinner />

            <Mascot />
        </div>
    );
}