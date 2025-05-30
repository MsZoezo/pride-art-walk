export function createQueryStringFromArray(array: unknown[], key: string) {
	return array.map(entry => `${key}[]=${entry}`).join("&");
}
