import { useState, useRef, useEffect } from "react"
import styles from "./mapFilter.module.css"
import useTags from "@/hooks/useTags";
import BaseModal from "../modals/baseModal/baseModal";

interface Props {
    onSelect: (value: any) => void
}

export default function MapFilter({ onSelect }: Props) {
    const { tags, isLoading, isError } = useTags();
    const [open, setOpen] = useState(false);
    const tagsRef = useRef<HTMLDivElement>(null);

    // TODO: Change from state + prop func to context.
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const onClick = (id: number) => {
        onSelect(selectedTags.includes(id) ? selectedTags.filter(selected => selected !== id) : [...selectedTags, id])
        setSelectedTags(prev => prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]);
    }

    return(
        <>
            <button className={styles.button} onClick={() => setOpen(prev => !prev)}>
                <img src="/filter.svg" alt="" />
            </button>

            <BaseModal isOpen={open} onClose={() => setOpen(false)}>
                <div className={styles.tags}>
                {
                    tags?.map((tag, i) => (
                        <button key={`filter-${i}`} onClick={() => onClick(tag.id)} className={`${styles.tagButton} ${selectedTags.includes(tag.id) ? styles.selected : ''}`}>
                            {tag.name}
                        </button>
                    ))
                }
                </div>

                { selectedTags.length != 0 &&
                    <button onClick={() => { setSelectedTags([]); onSelect([]); }} className={styles.reset}>Reset filters</button>
                }
            </BaseModal>
        </>
    )
}