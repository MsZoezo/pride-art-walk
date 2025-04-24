export function createQueryStringFromArray(array: any[], key: string) {
    return array.map(entry => `${key}[]=${entry}`).join('&');
}