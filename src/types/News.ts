import { Tag } from "./Tag";

export interface News {
    id: number,
    title: string,
    date: string,
    description: string,
    image: string,
    tags: Tag[],
    is_active: boolean,
    created_at: string,
    updated_at: string,
}