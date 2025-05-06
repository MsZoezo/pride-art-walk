import { useState, useRef, useEffect } from "react"
import styles from "./mapFilter.module.css"
import useTags from "@/hooks/useTags";

interface Props {
    onSelect: (value: any) => void
}

export default function MapFilter({onSelect}: Props) {
    const { tags, isLoading, isError} = useTags();
    const [open, setOpen] = useState(false);
    const tagsRef = useRef<HTMLDivElement>(null);

    // TODO: Change from state + prop func to context.
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const onClick = (id: number) => {
        onSelect(selectedTags.includes(id) ? selectedTags.filter(selected => selected !== id) : [...selectedTags, id])
        setSelectedTags(prev => prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]);
    }

    return (
        <div className={styles.filterCard}>
            <div className={`${styles.tags} ${open? styles.open : ''}`} ref={tagsRef}>
                {
                    tags?.map((tag, i) => (
                        <button key={`filter-${i}`} onClick={() => onClick(tag.id)} className={`${styles.button} ${selectedTags.includes(tag.id) ? styles.selected:''}`}>
                            { tag.name }
                        </button>
                    ))
                }
            </div>
            <button className={styles.filterButton} onClick={() => setOpen(!open)}>
                Icoon
            </button>
        </div>
    )
}