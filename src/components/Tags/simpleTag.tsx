import { Tag } from "@/types/Tag"
import styles from "./simpleTag.module.css";

interface Props {
    tag: Tag
}

export default function SimpleTag({ tag }: Props) {
    return (
        <div className={styles.base}>
            {tag.name}
        </div>
    )
}