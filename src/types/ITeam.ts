import { IDocument } from "./atoms/IDocument";

/**
 * This interface describes the properties of a team member.
 */
export interface ITeam extends IDocument {
	/** The name of the team member. */
	name: string;

	/** Profile picture of the team member. */
	photo?: string;

	// TODO: describe this, Kyryl do we need this?
	pivot?: {
		about_us_id: number;
		partner_id: number;
	};
}
