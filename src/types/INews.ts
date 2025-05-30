import { IDocument } from "./atoms/IDocument";
import { IImage } from "./atoms/IImage";
import { Tag } from "./ITag";

/**
 * This interface describes the properties available in a news item.
 */
export interface INews extends IDocument, IImage {
	/** Title of the news item */
	title: string;

	/** Publish date of the news item */
	date: string;

	/** Description of the news item, raw html. */
	description?: string;

	/** List of descriptive tags relevant to the news item. */
	tags: Tag[];

	/** If the news item is active & should be displayed. */
	is_active: boolean;
}
