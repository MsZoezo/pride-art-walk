/**
 * This interface describes the shared image properties needed by other interfaces.
 */
export interface IImage {
	/** The image url. */
	image?: string;

	/** The alt text of the image. */
	image_alt?: string;

	/** The image caption. */
	image_caption?: string;
}
