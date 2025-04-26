import { Exhibition } from "@/types/Exhibition";
import fetcher from "@/util/fetch/fetcher";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useExhibitions() {
    const { data, error, isLoading } = useSWR(`${API_URL}/exhibitions`, fetcher<Exhibition[]>);

    return {
        exhibitions: data,
        isError: error,
        isLoading
    }
}