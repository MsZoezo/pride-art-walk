import { IExhibition } from "@/types/IExhibition";
import fetcher from "@/util/fetch/fetcher";
import RetryWithCountdown from "@/util/fetch/retry";
import { useRef, useState } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Hook to retrieve exhibitions from server or cache.
 *
 * @returns exhibitions, and SWR specific variables
 */
export default function useExhibitions() {
	const [retryTime, setRetryTime] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout>(null);

	const retryMiddleware = RetryWithCountdown(setRetryTime, intervalRef);

	const { data, error, isLoading } = useSWR(`${API_URL}/exhibitions`, fetcher<IExhibition[]>, {
		use: [retryMiddleware],
	});

	return {
		exhibitions: data,
		isError: error,
		isLoading,
		retryTime,
	};
}
