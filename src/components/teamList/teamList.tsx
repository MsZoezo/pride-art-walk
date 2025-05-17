import { Team } from "@/types/Team";
import styles from "./teamList.module.css"
import Avatar from "../avatar/avatar";
interface Props {
    teams: Team[]
}

export default function TeamList({ teams }: Props) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Our teams</h2>
            
            <ul className={styles.teams}>
                {
                    teams?.map((team) => (
                        <Avatar person={team}/>
                    ))
                }
            </ul>
        </section>
    )
}