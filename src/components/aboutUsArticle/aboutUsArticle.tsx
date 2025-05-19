import AboutContactArticle from "../aboutContactArticle/aboutContactArticle";
import AboutPlaceholder from "../aboutPlaceholder/aboutPlaceholder";
import styles from './aboutUsArticle.module.css';
interface Props {
    text?: string,
    email?: string,
}

export default function AboutUsArticle({ text, email }: Props) {
    return (
        <article className={styles.card}>
            {
                text ? (
                    <div>
                        <p dangerouslySetInnerHTML={{__html: text}}/>
                        <AboutContactArticle email={email}/>
                    </div>
                ):<AboutPlaceholder/>
            }
        </article>
    )
}