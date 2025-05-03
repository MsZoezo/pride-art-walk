import { News } from "@/types/News";
import styles from "./newsCard.module.css";
import { CSSProperties } from "react";

interface Props {
    news: News,
    onClick?: any
    index: number;
}

export default function NewsCard({ news, onClick, index }: Props) {
    const description = news.description.replaceAll(/<\/?[^>]+(>|$)/g, "").split(/\s+/).slice(0, 25).join(' ') + '...';

    return(
        <article onClick={onClick} className={styles.card} style={{'--stagger': `${index * 100}ms`} as CSSProperties}>

            {news.image &&
                <figure className={styles.image}>
                    <img src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}/${news.image}`} alt="" />
                </figure>
            }

            <div className={styles.content}>
                <h3 className={styles.title}>{news.title}</h3>

                {/* <ul className={styles.tags}>
                    {exhibition.tags.map((tag, i) => <Tag key={`${exhibition.title}-tags-${i}`} text={tag.name} id={tag.id} index={i} />)}
                </ul> */}

                <p>{description}</p>

                <button className={styles.button}>Read more <img src="/arrow-right.svg" alt="" /></button>
            </div>
        </article>
    )
}