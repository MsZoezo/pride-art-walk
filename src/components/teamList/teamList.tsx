import { Team } from "@/types/Team";
import styles from "./teamList.module.css"
import Avatar from "../avatar/avatar";
interface Props {
    teams?: Team[]
}

export default function TeamList({ teams }: Props) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Our team-members</h2>
            
            {teams && teams.length > 0 ? (
                <ul className={styles.teams}>
                    {
                        teams.map((team) => (
                            <Avatar person={team}/>
                        ))
                    }
                </ul>
                )
                :
                (
                    <div className={styles.placeholder}>No teams yet.</div>
                )}
        </section>
    )
}