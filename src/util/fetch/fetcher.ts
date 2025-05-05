export default async function fetcher<Type>(url: string): Promise<Type | null> {
    let response;
    try {
        response = await fetch(url);
    } catch (err: unknown) {
        throw new Error(`Failed to connect to API!`);
    }
    
    if(!response.ok) throw new Error(`API returned an error!`);
    
    const json = await response.json();

    return json.data ?? json as Type;
}