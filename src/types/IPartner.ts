import { IDocument } from "./atoms/IDocument";

/**
 * This interface describes the properties available for a partner.
 */
export interface IPartner extends IDocument {
	/** The name of the partner */
	name: string;

	/** The image url of the partners logo. */
	logo?: string;

	// TODO: describe this, Kyryl do we need this?
	pivot?: {
		about_us_id: number;
		partner_id: number;
	};
}
