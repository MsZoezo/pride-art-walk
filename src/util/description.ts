export function toPreview(text?: string, maxLength: number = 25): string | null {
    if(!text) return null;

    return text.replaceAll(/<\/?[^>]+(>|$)/g, "").replaceAll(/\s|&nbsp;/g, ' ').split(/\s+/).slice(0, 25).join(' ') + '...';    
}