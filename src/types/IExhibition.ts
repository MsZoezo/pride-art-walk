import { IDocument } from "./atoms/IDocument";
import { IImage } from "./atoms/IImage";
import { IScheduleDate } from "./IScheduleDate";
import { ITag } from "./ITag";

/**
 * This interface describes the properties available in an exhibition.
 */
export interface IExhibition extends IDocument, IImage {
	/** Title of the exhibition. */
	title: string;

	/** List of descriptive tags relevant to the exhibition. */
	tags: ITag[];

	/** Indicates if this exhibition is a special event. */
	special_event: boolean;

	/** Name of the venue where the exhibition is held. */
	venue_name: string;

	/** List of one or multiple artists involved with the exhibition. */
	artist_name: string[];

	/** Description of the exhibition, raw html. */
	description?: string;

	/** Exhibition's address. */
	address?: string;

	/** Latitude & longtitude of the exhibition in order. */
	location: [number, number];

	/** The schedule items for the exhibition. */
	schedules: IScheduleDate[];

	/** If the exhibition is active & should be displayed. */
	is_active: boolean;
}
