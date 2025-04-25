import { Exhibition } from "@/types/Exhibition";
import { createQueryStringFromArray } from "@/util/query/arrayQueryString";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Tag {
    name: string
}

/**
 * Gets all exhibitions from rest api.
 * @returns All exhibitions available
 */
export async function getExhibitions(tags?: Tag[]): Promise<Exhibition[] | null> {
    let url = `${API_URL}/exhibitions`;
    if(tags) {
        url = url + `?${createQueryStringFromArray(tags, 'tags')}`
    }
    try {
        const response = await fetch(url);

        if(!response.ok) return null;

        const { data: exhibitions } = await response.json();
        return exhibitions;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function showExhibition() {
    // TODO
}