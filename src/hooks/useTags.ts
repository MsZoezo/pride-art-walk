import { Tag } from "@/types/Tag";
import fetcher from "@/util/fetch/fetcher";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useTags() {
    const { data, error, isLoading } = useSWR(`${API_URL}/tags`, fetcher<Tag[]>);

    return {
        tags: data,
        isError: error,
        isLoading
    }
}