import { Dispatch, RefObject, SetStateAction, use } from "react";
import { Middleware } from "swr";

export default function RetryWithCountdown(setRetryTime: Dispatch<SetStateAction<number>>, intervalRef: RefObject<NodeJS.Timeout | null>): Middleware {
    return (useSWRNext) => (key, fetcher, config) => {
        return useSWRNext(key, fetcher, {
            ...config,
            onErrorRetry: (err: any, key: any, config: any, revalidate: any, revalidateOpts: any) => {
                const count = Math.min(revalidateOpts.retryCount || 0, 12);
                const retryInterval = count * config.errorRetryInterval;

                let timeLeft = retryInterval / 1000;

                if(intervalRef.current) {
                    clearInterval(intervalRef.current);
                }

                setRetryTime(timeLeft);

                intervalRef.current = setInterval(() => {
                    timeLeft -= 1;
                    setRetryTime(timeLeft);
                    if (timeLeft <= 0) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                    }
        }, 1000);

        setTimeout(() => {
            revalidate(revalidateOpts);
        }, retryInterval);
            },
        });
    };
}