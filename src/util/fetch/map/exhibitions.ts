const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getExhibitions() {
    const response = await fetch(`${API_URL}/exhibitions`);
    const data = await response.json();
    return data
}

export async function showExhibition() {
    // TODO
}