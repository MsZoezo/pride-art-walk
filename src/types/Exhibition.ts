export interface Exhibition {
    title: string,
    artist_name: string,
    venue_name: string,
    address: string,
    description: string,
    tags: string[],
    special_event: boolean,
    image: string,
    location: number[],
    is_active: boolean | 0 | 1,
    image_alt?: string,
    date?: string | Date,

    created_at?: string | Date,
}