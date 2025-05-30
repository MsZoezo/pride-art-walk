import { ITeam } from "@/types/ITeam";
import styles from "./teamList.module.css";
import TeamAvatar from "../teamAvatar/teamAvatar";
interface Props {
	teams?: ITeam[];
}

export default function TeamList({ teams }: Props) {
	return (
		<section className={styles.section}>
			<h2 className={styles.title}>Our team-members</h2>

			{teams && teams.length > 0 ? (
				<ul className={styles.teams}>
					{teams.map(team => (
						<TeamAvatar
							key={team.id}
							person={team}
						/>
					))}
				</ul>
			) : (
				<div className={styles.placeholder}>No teams yet.</div>
			)}
		</section>
	);
}
