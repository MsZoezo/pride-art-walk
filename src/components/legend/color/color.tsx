import styles from "./color.module.css";

interface Props {
    color: string,
    name: string,
}

export default function Color({ color, name }: Props) {
    return(
        <li className={styles.item}>
            <figure className={styles.color} style={{background: color}}></figure>
            <p className={styles.name}>{name}</p>
        </li>
    );
}