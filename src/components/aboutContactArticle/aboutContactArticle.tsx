import AboutPlaceholder from "../aboutPlaceholder/aboutPlaceholder";
import ContactLink from "../contactLink/contactLink";
import styles from "./aboutContactArticle.module.css";
interface Props {
	email?: string;
}

export default function AboutContactArticle({ email }: Props) {
	return (
		<div className={styles.card}>
			<p>You can contact us via:</p>
			{email ? (
				<div>
					<ContactLink href={`mailto:${email}`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-mail text-primary"
						>
							<rect
								width="20"
								height="16"
								x="2"
								y="4"
								rx="2"
							></rect>
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
						</svg>
						{email}
					</ContactLink>
				</div>
			) : (
				<AboutPlaceholder />
			)}
		</div>
	);
}
