import { INews } from "@/types/INews";
import fetcher from "@/util/fetch/fetcher";
import RetryWithCountdown from "@/util/fetch/retry";
import { useRef, useState } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useNews() {
	const [retryTime, setRetryTime] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout>(null);

	const retryMiddleware = RetryWithCountdown(setRetryTime, intervalRef);

	const { data, error, isLoading } = useSWR(`${API_URL}/news`, fetcher<INews[]>, {
		use: [retryMiddleware],
	});

	return {
		news: data,
		isError: error,
		isLoading,
		retryTime,
	};
}
