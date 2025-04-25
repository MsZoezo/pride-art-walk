import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionCard.module.css";
import Tag from "../tag/tag";

interface Props {
    exhibition: Exhibition,
    onClick?: any
}

export default function ExhibitionCard({ exhibition, onClick }: Props) {
    const description = exhibition.description.replaceAll(/<\/?[^>]+(>|$)/g, "").split(/\s+/).slice(0, 25).join(' ') + '...';
    return (
        <article onClick={onClick} className={styles.card}>

            {exhibition.image &&
                <figure className={styles.image}>
                    <img src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${exhibition.image}`} alt="" />
                </figure>
            }

            <div className={styles.content}>
                <h3 className={styles.title}>{exhibition.title}</h3>

                <ul className={styles.tags}>
                    {exhibition.tags.map((tag, i) => <Tag key={`${exhibition.title}-tags-${i}`} text={tag.name} index={i} />)}
                </ul>

                <p>{description}</p>

                <button className={styles.button}>Read more <img src="/arrow-right.svg" alt="" /></button>
            </div>
        </article>
    )
}