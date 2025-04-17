import { Exhibition } from "@/types/Exhibition";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Gets all exhibitions from rest api.
 * @returns All exhibitions available
 */
export async function getExhibitions(): Promise<Exhibition[]> {
    try {
        const response = await fetch(`${API_URL}/exhibitions`);

        const { data: exhibitions } = await response.json();
        return exhibitions;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function showExhibition() {
    // TODO
}