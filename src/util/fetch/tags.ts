import { ITag } from "@/types/ITag";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Gets all tags from rest api.
 * @returns All tags
 */
export async function getTags(): Promise<ITag[]> {
	try {
		const response = await fetch(`${API_URL}/tags`);

		const tags = await response.json();
		return tags;
	} catch (error) {
		console.error(error);
		return [];
	}
}
