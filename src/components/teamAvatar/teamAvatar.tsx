import { ITeam } from "@/types/ITeam";
import styles from "./teamAvatar.module.css";
interface Props {
	person: ITeam;
}

export default function TeamAvatar({ person }: Props) {
	return (
		<article className={styles.card}>
			<figure className={styles.pfp}>
				<img
					src={
						person.photo
							? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${person.photo}`
							: "/images/default_pfp.svg"
					}
					alt=""
				/>
			</figure>

			<h3>{person.name}</h3>
		</article>
	);
}
