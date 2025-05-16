import AboutPlaceholder from "./aboutPlaceholder";
import styles from './aboutUsArticle.module.css';
interface Props {
    text?: string
}

export default function AboutUsArticle({ text }: Props) {
    return (
        <article className={styles.aboutArticle}>
            <h1 className={styles.aboutTitle}>
                About us
            </h1>

            {
                text ? (
                    <p dangerouslySetInnerHTML={{__html: text}}/>
                ):<AboutPlaceholder/>
            }
        </article>
    )
}