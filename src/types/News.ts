import { Tag } from "./Tag";

export interface News {
    id: number,
    title: string,
    date: string,
    description: string,
    image: string,
    image_alt: string,
    image_description: string,
    tags: Tag[],
    is_active: boolean,
    created_at: string,
    updated_at: string,
}