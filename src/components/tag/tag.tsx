import styles from "./tag.module.css";

interface Props {
    text: string;
    index?: number;
}

const colours = [
    '#F7C3DC66',
    '#D0EBFC66',
    '#C3E1CC66',
    '#829FAE66'
];

export default function Tag({ text, index }: Props) {
    const background = colours[(index ?? 0) % colours.length];

    return(
        <li className={styles.tag} style={{background: background}}>
            {text}
        </li>
    );
}