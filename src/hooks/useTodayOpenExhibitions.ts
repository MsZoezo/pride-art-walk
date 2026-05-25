import { IExhibition } from "@/types/IExhibition";
import fetcher from "@/util/fetch/fetcher";
import RetryWithCountdown from "@/util/fetch/retry";
import { useRef, useState } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Hook to retrieve exhibitions that are open today from server or cache.
 *
 * @returns today open exhibitions, and SWR specific variables
 */
export default function useTodayOpenExhibitions() {
	const [retryTime, setRetryTime] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout>(null);

	const retryMiddleware = RetryWithCountdown(setRetryTime, intervalRef);

	const { data, error, isLoading } = useSWR(`${API_URL}/exhibitions/today-open`, fetcher<IExhibition[]>, {
		use: [retryMiddleware],
		refreshInterval: 300000, // Refresh every 5 minutes
	});

	return {
		exhibitions: data,
		isError: error,
		isLoading,
		retryTime,
	};
}
