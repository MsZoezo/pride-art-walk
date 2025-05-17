import { Partner } from "@/types/Partner"
import styles from "./partnerList.module.css"
import PartnerCard from "../partnerCard/partnerCard"
interface Props {
    partners?: Partner[]
}

export default function PartnerList({ partners }: Props) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Partners</h2>
            
            <ul className={styles.partners}>
                {
                    partners?.map((partner) => (
                        <PartnerCard partner={partner}/>
                    ))
                }
            </ul>
        </section>
    )
}