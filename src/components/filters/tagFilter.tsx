import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import styles from "./tagFilter.module.css"
import useTags from "@/hooks/useTags";
import { useListContext } from "@/context/ListContextProvider";

export default function TagFilter() {
    const { tags, isLoading, isError} = useTags();
    const { selectedTags, setSelectedTags } = useListContext()!;

    const tagsRef = useRef<HTMLDivElement>(null);

    const [ open, setOpen ] = useState<boolean>(false);

    // useEffect(() => {
    //     const tags = tagsRef.current!;

    //     if(open) {
    //         tags.style.maxHeight = `${tags.scrollHeight}px`;
    //         // setTimeout(() => tags.style.maxHeight = '', 600);
    //     } else {
    //         tags.style.maxHeight = '';
    //     }
    // }, [open]);

    const onClick = (id: number) => {
        setSelectedTags(prev => prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]);
    }

    return (
        <div className={styles.container}>
            <button className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
                <h3 className={styles.title}>Tags</h3>
                <img src={open ? '/eye-open.svg' : '/eye-closed.svg'} className={styles.eye} />
            </button>

            <div className={`${styles.tags} ${open? styles.open : ''}`} ref={tagsRef}>
                {
                    tags?.map((tag, i) => (
                        <button key={`filter-${i}`} onClick={() => onClick(tag.id)} className={`${styles.button} ${selectedTags.includes(tag.id) ? styles.selected:''}`}>
                            { tag.name }
                        </button>
                    ))
                }
            </div>
        </div>
    )
}