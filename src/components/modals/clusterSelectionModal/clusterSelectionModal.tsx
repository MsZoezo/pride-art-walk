"use client";

import { IExhibition } from "@/types/IExhibition";
import BaseModal from "../baseModal/baseModal";
import styles from "./clusterSelectionModal.module.css";
import isOpen from "@/util/datetime/isOpen";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	exhibitions: IExhibition[];
	onSelectExhibition: (slug: string) => void;
}

export default function ClusterSelectionModal({ isOpen: modalIsOpen, onClose, exhibitions, onSelectExhibition }: Props) {
	if (!exhibitions || exhibitions.length === 0) return null;

	const handleSelect = (slug: string) => {
		onClose();
		onSelectExhibition(slug);
	};

	return (
		<BaseModal isOpen={modalIsOpen} onClose={onClose}>
			<div className={styles.container}>
				<h2 className={styles.title}>Choose an exhibition</h2>
				<p className={styles.subtitle}>{exhibitions.length} exhibitions at this location</p>

				<ul className={styles.list}>
					{exhibitions.map((exhibition) => {
						const opened = isOpen(exhibition.schedules);
						return (
							<li key={exhibition.id}>
								<button
									className={styles.item}
									onClick={() => handleSelect(exhibition.slug)}
								>
									<span className={`${styles.indicator} ${opened ? styles.open : styles.closed}`} />
									<div className={styles.info}>
										<span className={styles.name}>{exhibition.title}</span>
										<span className={styles.venue}>{exhibition.venue_name}</span>
									</div>
									<img src="/arrow-right.svg" alt="" className={styles.arrow} />
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</BaseModal>
	);
}
