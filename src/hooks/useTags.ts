import { ITag } from "@/types/ITag";
import fetcher from "@/util/fetch/fetcher";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Hook to retrieve tags from server or cache.
 *
 * @param requiredContentType The content type to get all tags from
 * @returns Tags, and SWR specific variables
 */
export default function useTags(requiredContentType?: string) {
	const { data, error, isLoading } = useSWR(
		`${API_URL}/tags${requiredContentType ? `?requiredContentType=${requiredContentType}` : ""}`,
		fetcher<ITag[]>,
	);

	return {
		tags: data,
		isError: error,
		isLoading,
	};
}
