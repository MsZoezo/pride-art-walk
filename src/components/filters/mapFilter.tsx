import { useState, useRef, useEffect } from "react"
import styles from "./mapFilter.module.css"
import useTags from "@/hooks/useTags";
import BaseModal from "../modals/baseModal/baseModal";
import { useMapContext } from "@/context/MapContextProvider";

export default function MapFilter() {
    const { tags, isLoading, isError } = useTags('exhibitions');
    const { selectedTags, setSelectedTags } = useMapContext()!;

    const [open, setOpen] = useState(false);

    const onClick = (id: number) => {
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
                    <button onClick={() => setSelectedTags([])} className={styles.reset}>Reset filters</button>
                }
            </BaseModal>
        </>
    )
}