import { IImage } from "./atoms/IImage";
import { IPartner } from "./IPartner";
import { ITeam } from "./ITeam";

/**
 * This interface describes the properties available in an exhibition.
 */
export interface IAboutArticle extends IImage {
    /** Description of the exhibition, raw html. */
    description?: string,

    /** An email adres string that indicates where to send emails to */
    email?: string,

    /** A link string  */
    image?: string,

    /** List of Pride art walk partners / supporters */
    partners?: IPartner[]

    /** List of individual team members associated with Pride art walk */
    teams?: ITeam[]
}
