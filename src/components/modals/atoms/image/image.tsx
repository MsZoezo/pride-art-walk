import styles from "./image.module.css";

interface Props {
    src: string,

    alt?: string,
    caption?: string;
}

export default function Image({ src, alt, caption }: Props) {
    return(
        <figure className={styles.figure}>
            <img className={styles.image} src={src} alt={alt} />
            { caption && <p className={styles.caption}>{caption}</p> }
        </figure>
    );
}