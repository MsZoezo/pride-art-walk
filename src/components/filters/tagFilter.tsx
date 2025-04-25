import { Dispatch, SetStateAction, useState } from "react"
import styles from "./tagFilter.module.css"

interface Props {
    tags: any[],

    setSelectedTags: Dispatch<SetStateAction<number[]>>,
    selectedTags: Number[],
}

export default function TagFilter({ tags, setSelectedTags, selectedTags }: Props) { 

    const onClick = (id: number) => {
        setSelectedTags(prev => prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]);
    } 

    return (
        <div className={styles.container}>
            {
                tags.map((tag, i) => (
                    <button key={`filter-${i}`} onClick={() => onClick(tag.id)} className={`${styles.button} ${selectedTags.includes(tag.id) ? styles.selected:''}`}>
                        { tag.name }
                    </button>
                ))
            }
        </div>
    )
}