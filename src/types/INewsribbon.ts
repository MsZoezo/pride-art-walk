import { IDocument } from "./atoms/IDocument";

/**
 * This interface describes the properties availabe on the news ribbon data received from the api.
 */
export interface INewsribbon extends IDocument {
	/** The news text, raw html */
	text: string;

	/** If the news ribbon is active & should be displayed. */
	active: boolean;
}
