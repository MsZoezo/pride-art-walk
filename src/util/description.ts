/**
 * Helper function to transform a raw html string to a preview string of x words.
 *
 * @param text The raw html text
 * @param maxLength Max number of words to preview
 * @returns Preview string
 */
export function toPreview(text?: string, maxLength: number = 25): string | null {
	if (!text) return null;

	return (
		text
			.replaceAll(/<\/?[^>]+(>|$)/g, "")
			.replaceAll(/\s|&nbsp;/g, " ")
			.split(/\s+/)
			.slice(0, maxLength)
			.join(" ") + "..."
	);
}
