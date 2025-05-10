import { Exhibition } from "@/types/Exhibition";
import ExhibitionMarker from "../exhibitionMarker/exhibitionMarker";
import ExhibitionModal from "../modals/exhibitionModal/exhibitionModal";
import { useEffect, useState } from "react";
import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
    exhibitions: Exhibition[];
}

export default function MapExhibitions({ exhibitions }: Props) {
    const router = useRouter();
    const params = useSearchParams();
    const { initialLoad } = useLoadContext()!;

    const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /** Changes the modal to the exhibition identified by id.
     * @param id the exhibition id.
    */
    const changeModal = (id: number) => {
        if (!exhibitions) return;

        const exhibition = exhibitions.find(exhibition => exhibition.id === id);

        window.history.pushState(null, '', `?exhibition=${id}`);

        if (!exhibition) return;

        setCurrentExhibition(exhibition);
        setIsModalOpen(true);
    }

    useEffect(() => {
        const id = params.get('exhibition');

        if(!id) {
            setIsModalOpen(false);
            return;
        }

        const exhibition = exhibitions.find(exhibition => exhibition.id === Number(id));

        if(!exhibition) {
            setIsModalOpen(false);
            return;
        }

        if(exhibition === currentExhibition && isModalOpen) return;

        setCurrentExhibition(exhibition);
        setIsModalOpen(true);
    }, [params, exhibitions]);

    const closeModal = () => {
        if(!initialLoad && params.get('exhibition')) window.history.back();
        else window.history.replaceState(null, '', '/');

        setIsModalOpen(false);
    }

    return (
        <>
            {exhibitions?.map((exhibition, index) => (
                <ExhibitionMarker key={`exhibition-marker-${exhibition.id}`} exhibition={exhibition} onClick={changeModal} />
            ))}

            <ExhibitionModal isOpen={isModalOpen} onClose={closeModal} exhibition={currentExhibition} />
        </>
    );
}