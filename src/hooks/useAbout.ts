import { Exhibition } from "@/types/Exhibition";
import fetcher from "@/util/fetch/fetcher";
import RetryWithCountdown from "@/util/fetch/retry";
import { useRef, useState } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useAbout() {
    const [retryTime, setRetryTime] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const retryMiddleware = RetryWithCountdown(setRetryTime, intervalRef);

    const { data, error, isLoading } = useSWR(`${API_URL}/about-us`, fetcher<any>, {
        use: [retryMiddleware]
    });

    return {
        data: data,
        description: data?.description,
        email: data?.email,
        image: data?.image,
        partners: data?.partners,
        teams: data?.teams,
        isError: error,
        isLoading,
        retryTime,
    }
}