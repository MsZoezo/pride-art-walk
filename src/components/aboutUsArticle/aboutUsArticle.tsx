import AboutContactArticle from "../aboutContactArticle/aboutContactArticle";
import AboutPlaceholder from "../aboutPlaceholder/aboutPlaceholder";
import styles from "./aboutUsArticle.module.css";
interface Props {
	text?: string;
	email?: string;
	image?: string;
}

export default function AboutUsArticle({ text, email, image }: Props) {
	return (
		<div className={styles.wrapper}>
			<article className={styles.card}>
				<h1 className={styles.title}>About us</h1>
				{text ? (
					<div>
						<p dangerouslySetInnerHTML={{ __html: text }} />
						<AboutContactArticle email={email} />
					</div>
				) : (
					<AboutPlaceholder />
				)}
			</article>
			{image && (
				<figure className={styles.image}>
					<img
						src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${image}`}
						alt=""
					/>
				</figure>
			)}
		</div>
	);
}
