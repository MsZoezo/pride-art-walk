import { Exhibition } from "@/types/Exhibition";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Gets all exhibitions from rest api.
 * @returns All exhibitions available
 */
export async function getExhibitions(): Promise<Exhibition[]> {
    const response = await fetch(`${API_URL}/exhibitions`);

    const { data: exhibitions} = await response.json();
    return exhibitions;
}

export async function showExhibition() {
    // TODO
}