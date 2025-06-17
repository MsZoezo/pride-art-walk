/**
 * This interface describes the properties of a tag.
 */
export interface ITag {
	/** The unique id of the tag. */
	id: number;

	/** The name of the tag. */
	name: string | null;

	image?: string | null;
}
