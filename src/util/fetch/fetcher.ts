export default async function fetcher<Type>(url: string): Promise<Type> {
    const response = await fetch(url);

    if(!response.ok) throw new Error(`Fetcher failed to fetch '${url}'`);

    const json = await response.json();

    return json.data ?? json as Type;
}