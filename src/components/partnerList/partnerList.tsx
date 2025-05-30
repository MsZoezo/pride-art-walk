import { IPartner } from "@/types/IPartner";
import styles from "./partnerList.module.css";
import PartnerCard from "../partnerCard/partnerCard";
interface Props {
	partners?: IPartner[];
}

export default function PartnerList({ partners }: Props) {
	return (
		<section className={styles.section}>
			<h2 className={styles.title}>Partners</h2>

			{partners && partners.length > 0 ? (
				<ul className={styles.partners}>
					{partners?.map(partner => (
						<PartnerCard
							key={partner.id}
							partner={partner}
						/>
					))}
				</ul>
			) : (
				<div className={styles.placeholder}>No partners yet</div>
			)}
		</section>
	);
}
