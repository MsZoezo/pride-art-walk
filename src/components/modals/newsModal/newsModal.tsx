import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";
import BaseModal from "../baseModal/baseModal";
import styles from "./newsModal.module.css";
import Link from "next/link";
import { generateMapsLink } from "@/util/navigate/navigate.location";
import { useUserLocationContext } from "@/context/UserLocationContextProvider";
import Tag from "@/components/tag/tag";
import Spinner from "@/components/spinner/spinner";
import ScheduleItem from "@/components/scheduleItem/scheduleItem";
import ScheduleList from "@/components/scheduleList/scheduleList";
import { News } from "@/types/News";
import Image from "../atoms/image/image";
import Description from "../atoms/description/description";

interface Props {
	isOpen: boolean;
	onClose: () => void;

	news: News | null;
}

export default function NewsModal({ isOpen, onClose, news }: Props) {
	if (!news) return;

	const date = new Date(news.date).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
		>
			<svg
				className={`${styles.blobGreen} ${styles.blob}`}
				width="122"
				height="217"
				viewBox="0 0 122 217"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M150.384 19.1274C160.928 34.6455 165.47 50.3252 167.254 64.7118C169.038 79.0984 167.741 92.3534 162.063 102.537C156.548 112.559 146.329 119.51 136.433 141.979C126.538 164.61 116.806 202.92 99.2865 213.589C81.6051 224.419 56.2997 207.769 39.1051 187.402C21.9104 167.196 13.1508 143.434 6.66226 119.833C0.011488 96.0713 -4.20608 72.4709 6.66226 58.5692C17.6928 44.506 43.8093 39.9798 63.1127 27.3714C82.4162 14.9246 94.7445 -5.92788 109.019 -8.67587C123.456 -11.4239 139.84 3.77094 150.384 19.1274Z"
					fill="#C3E1CC"
					fill-opacity="0.4"
				/>
			</svg>

			<svg
				className={`${styles.blobPink} ${styles.blob}`}
				width="212"
				height="111"
				viewBox="0 0 212 111"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M72.0384 88.6914C57.3498 78.9753 41.9447 69.7989 26.3605 53.0655C10.9553 36.3321 -4.62891 12.4016 1.28236 -4.15186C7.37276 -20.7053 34.9587 -29.7018 57.1707 -34.9197C79.5619 -39.9577 96.5791 -41.2172 117.358 -46.4351C138.137 -51.833 162.857 -61.0094 182.74 -55.0717C202.445 -48.9541 217.491 -27.9025 221.791 -5.59129C225.91 16.8998 219.104 40.4705 207.46 58.2835C195.638 76.0964 179.158 87.9717 162.678 96.9682C146.198 106.145 129.897 112.622 115.029 110.643C99.9826 108.664 86.5479 98.5875 72.0384 88.6914Z"
					fill="#F7C3DC"
					fill-opacity="0.4"
				/>
			</svg>

			<h2 className={styles.title}>{news.title}</h2>
			<h3 className={styles.date}>{date}</h3>
			{/* <h3 className={styles.venue}>{news.venue_name}</h3> */}

			<ul className={styles.tags}>
				{news.tags.map((tag, i) => (
					<Tag
						key={`${news.title}-tags-${i}`}
						text={tag.name}
						id={tag.id}
						index={i}
					/>
				))}
			</ul>

			<div className={styles.content}>
				{news.image && (
					<Image
						src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${news.image}`}
						alt={news.image_alt}
						caption={news.image_caption}
					/>
				)}

				<Description content={news.description} />
			</div>
		</BaseModal>
	);
}
