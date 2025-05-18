import { useMemo } from "react"
import styles from "./footer.module.css"

export default function Footer() {
    const year = useMemo(()=> {
        const date = new Date();
        return date.getFullYear();
    }, [])

    return (
        <section className={styles.footer}>
            <div className={styles.copr}>
                © { year } Pride Art Walk. All rights reserved.
            </div>
        </section>
    )
}