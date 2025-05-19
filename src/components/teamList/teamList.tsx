import { Team } from "@/types/Team";
import styles from "./teamList.module.css"
import TeamAvatar from "../teamAvatar/teamAvatar";
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
                            <TeamAvatar person={team}/>
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