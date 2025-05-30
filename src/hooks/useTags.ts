import { Tag } from "@/types/ITag";
import fetcher from "@/util/fetch/fetcher";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useTags(requiredContentType?: string) {
	const { data, error, isLoading } = useSWR(
		`${API_URL}/tags${requiredContentType ? `?requiredContentType=${requiredContentType}` : ""}`,
		fetcher<Tag[]>,
	);

	return {
		tags: data,
		isError: error,
		isLoading,
	};
}
