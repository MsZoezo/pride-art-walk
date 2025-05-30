import { Partner } from "@/types/Partner";
import styles from "./partnerCard.module.css";

interface Props {
	partner: Partner;
}

export default function PartnerCard({ partner }: Props) {
	return (
		<article className={styles.card}>
			<figure className={styles.pfp}>
				<img
					src={
						partner.logo
							? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${partner.logo}`
							: ""
					}
					alt=""
				/>
			</figure>

			<h3>{partner.name}</h3>
		</article>
	);
}
