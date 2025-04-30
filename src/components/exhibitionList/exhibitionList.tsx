import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionList.module.css";
import ExhibitionCard from "../exhibitionCard/exhibitionCard";
import { useEffect, useMemo, useState } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useSelectedTagsContext } from "@/context/SelectedTagsContextProvider";

interface Props {
    exhibitions?: Exhibition[];
}

export default function ExhibitionList({ exhibitions }: Props) {
    const [key, setKey] = useState<number>(0);
    const { selectedTags } = useSelectedTagsContext();

    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const showModal = (exhibition: Exhibition) => {
        setCurrentExhibition(exhibition)
        setIsModalOpen(true);
    }

    const shownExhibitions = useMemo(() => {
        if(!exhibitions) return;

        setKey(prev => prev + 1);

        const allExhibitions = [...exhibitions];

        if(!selectedTags || selectedTags.length == 0) {
            return allExhibitions;
        }

        const filteredExhibitions = allExhibitions.filter(exhibition => {
            for(let i = 0; i < selectedTags.length; i++) {
                if(!exhibition.tags.find(tag => tag.id === selectedTags[i])) continue;

                return true;
            }
            return false;
        });

        return filteredExhibitions;
    }, [exhibitions, selectedTags]);

    return(
        <>
            <section className={styles.exhibitions}>
                {
                    shownExhibitions?.map((exhibition, i) => (
                        <ExhibitionCard key={`${key}-${exhibition.id}`} index={i} exhibition={exhibition} onClick={() => showModal(exhibition)}/>
                    ))
                }
            </section>

            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />

        </>
    );
}