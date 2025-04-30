import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionList.module.css";
import ExhibitionCard from "../exhibitionCard/exhibitionCard";
import { useState } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";

interface Props {
    exhibitions?: Exhibition[];
}

export default function ExhibitionList({ exhibitions }: Props) {
    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const showModal = (exhibition: Exhibition) => {
        setCurrentExhibition(exhibition)
        setIsModalOpen(true);
    }

    return(
        <>
            <section className={styles.exhibitions}>
                {
                    exhibitions?.map((exhibition) => (
                        <ExhibitionCard key={exhibition.id} exhibition={exhibition} onClick={() => showModal(exhibition)}/>
                    ))
                }
            </section>

            <ExhibitionModal isOpen={isModalOpen} setOpen={setIsModalOpen} exhibition={currentExhibition} />

        </>
    );
}