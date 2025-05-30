/**
 * This interface describes the base properties available on most api documents.
 */
export interface IDocument {
	/** The unique id of the document. */
	id: number;

	/** When this document was created. */
	created_at: string;

	/** When this document was last updated. */
	updated_at: string;
}
