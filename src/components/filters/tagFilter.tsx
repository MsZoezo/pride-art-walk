import { useState } from "react"
import styles from "./tagFilter.module.css"

interface Props {
    tags: any[],
    onSelected?: any
}

export default function TagFilter({ tags, onSelected }: Props) { 
    const [selected, setSelected] = useState<string[]>([]);
    const addToSelected = (newItem: string) => {
        let tempSelected = []
        if(selected.includes(newItem)) {
            tempSelected = selected.filter(tag => tag !== newItem);
        }
        else {
            tempSelected = [...selected, newItem];
        }
        if(onSelected) {
            onSelected(tempSelected)
        }
        setSelected(tempSelected);
    }
    return (
        <div className={styles.container}>
            {
                tags.map(tag => (
                    <button onClick={() => addToSelected(tag.id)} className={`${styles.button} ${selected.includes(tag.id) ? styles.selected:''}`}>
                        { tag.name }
                    </button>
                ))
            }
        </div>
    )
}