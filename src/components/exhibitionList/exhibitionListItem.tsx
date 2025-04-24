import { Exhibition } from "@/types/Exhibition";
import SimpleTag from "../Tags/simpleTag";
import styles from "./exhibitionListItem.module.css"

interface Props {
    exhibition: Exhibition,
    onClick?: any
}

export default function ExhibitionListItem ({ exhibition, onClick }: Props) {
    return (
        <article onClick={onClick} className={styles.card}>
            <h3>{exhibition.title}</h3>
            <p>{exhibition.description}</p>

            <div className={styles.tagHolder}>
                {
                    exhibition.tags.map((tag) => (
                        <SimpleTag tag={tag}/>
                    ))
                }
            </div>
        </article>
    )
}