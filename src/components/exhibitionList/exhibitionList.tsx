import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionList.module.css";
import ExhibitionCard from "../exhibitionCard/exhibitionCard";
import { useEffect, useState } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";

interface Props {
    exhibitions?: Exhibition[];
}

export default function ExhibitionList({ exhibitions }: Props) {
    const [key, setKey] = useState<number>(0);

    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const showModal = (exhibition: Exhibition) => {
        setCurrentExhibition(exhibition)
        setIsModalOpen(true);
    }

    useEffect(() => setKey(prev => prev + 1), [exhibitions]);

    return(
        <>
            <section className={styles.exhibitions}>
                {
                    exhibitions?.map((exhibition, i) => (
                        <ExhibitionCard key={`${key}-${exhibition.id}`} index={i} exhibition={exhibition} onClick={() => showModal(exhibition)}/>
                    ))
                }
            </section>

            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />

        </>
    );
}