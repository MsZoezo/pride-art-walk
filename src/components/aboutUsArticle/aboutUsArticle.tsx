import AboutPlaceholder from "../aboutPlaceholder/aboutPlaceholder";
import styles from './aboutUsArticle.module.css';
interface Props {
    text?: string
}

export default function AboutUsArticle({ text }: Props) {
    return (
        <article className={styles.card}>
            <h2 className={styles.title}>
                Our history
            </h2>

            {
                text ? (
                    <p dangerouslySetInnerHTML={{__html: text}}/>
                ):<AboutPlaceholder/>
            }
        </article>
    )
}