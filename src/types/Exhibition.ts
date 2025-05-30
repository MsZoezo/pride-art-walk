import { ScheduleDate } from "./ScheduleDate";
import { Tag } from "./Tag";

/**
 * This interface describes the data available in an exhibition.
 */
export interface Exhibition {
    /** Unique id to identify the exhibition. */
    id: number;

    /** Title of the exhibition */
    title: string,

    /** List of descriptive tags relevant to the exhibition. */
    tags: Tag[],

    /** Indicates if this exhibition is a special event. */
    special_event: boolean,

    /** Name of the venue where the exhibition is held */
    venue_name: string,

    /** List of one or multiple artists involved with the exhibition. */
    artist_name: string[],

    /** Description of the exhibition, raw html. */
    description?: string,

    /** The image url of the exhibition. */
    image?: string,

    /** The alt text of the exhibition image. */
    image_alt?: string,

    image_caption?: string,

    /** Exhibition's address. */
    address?: string,

    /** Latitude & longtitude of the exhibition in order. */
    location: number[],

    schedules: ScheduleDate[],

    /** If the exhibition is active & should be displayed. */
    is_active: boolean | 0 | 1,

    /** When this exhibition was created. */
    created_at?: string | Date,

    /** When this exhibition was last updated. */
    updated_at?: string | Date,
}