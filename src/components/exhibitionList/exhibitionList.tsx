import { Exhibition } from "@/types/Exhibition";
import styles from "./exhibitionList.module.css";
import ExhibitionCard from "../exhibitionCard/exhibitionCard";
import { useEffect, useMemo, useState } from "react";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useListContext } from "@/context/ListContextProvider";
import { useParams, useRouter, useSearchParams, } from "next/navigation";
import { useLoadContext } from "@/context/LoadContextProvider";


interface Props {
    exhibitions?: Exhibition[];
}

export default function ExhibitionList({ exhibitions }: Props) {
    const params = useSearchParams();
    const router = useRouter();
    const { initialLoad } = useLoadContext()!;
    const { selectedTags, searchString } = useListContext()!;

    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const showModal = (exhibition: Exhibition) => {
        router.push(`/exhibitions?exhibition=${exhibition.id}`);
        setCurrentExhibition(exhibition);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        if(!initialLoad) router.back();
        else router.replace('/exhibitions');
        
        setIsModalOpen(false);
    }

    useEffect(() => {
        const id = params.get('exhibition');

        if(!id) {
            setIsModalOpen(false);
            return;
        }

        const exhibition = exhibitions?.find(val => val.id === Number(id));

        if(!exhibition) {
            setIsModalOpen(false);
            return;
        }

        if(currentExhibition === exhibition) return;

        setCurrentExhibition(exhibition);
        setIsModalOpen(true);
    }, [params, exhibitions]);

    const shownExhibitions = useMemo(() => {
        if(!exhibitions) return;

        let shownExhibitions = [...exhibitions];

        if(selectedTags.length == 0 && (!searchString || searchString.length == 0)) {
            return shownExhibitions;
        }

        if(selectedTags.length != 0) {
            shownExhibitions = shownExhibitions.filter(exhibition => {
                for(let i = 0; i < selectedTags.length; i++) {
                    if(!exhibition.tags.find(tag => tag.id === selectedTags[i])) continue;
    
                    return true;
                }
                return false;
            });
        }

        if(searchString) shownExhibitions = shownExhibitions.filter(exhibitions => exhibitions.title.toLowerCase().includes(searchString.toLowerCase()));

        return shownExhibitions;
    }, [exhibitions, selectedTags, searchString]);

    return(
        <>
            { (searchString?.length != 0 && shownExhibitions?.length == 0) &&
                <p className={styles.empty}>No exhibitions were found...</p>
            }

            <section className={styles.exhibitions}>
                {
                    shownExhibitions?.map((exhibition, i) => (
                        <ExhibitionCard key={`${i}-${exhibition.id}`} index={i} exhibition={exhibition} onClick={() => showModal(exhibition)}/>
                    ))
                }
            </section>

            <ExhibitionModal isOpen={isModalOpen} onClose={closeModal} exhibition={currentExhibition} />

        </>
    );
}