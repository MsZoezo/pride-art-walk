import { INewsribbon } from "@/types/INewsribbon";
import fetcher from "@/util/fetch/fetcher";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useNewsRibbon() {
	const { data, error, isLoading } = useSWR(`${API_URL}/news-ribbon`, fetcher<INewsribbon>, {
		refreshInterval: 5 * 60 * 1000,
	});

	return {
		data,
		isError: error,
		isLoading,
	};
}
