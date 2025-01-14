const BASE_URL = "http://localhost:3000/api/items";

export async function fetchItems(query = "", minPrice = "", maxPrice = "") {
    const url = new URL(BASE_URL);
    if (query) url.searchParams.append("q", query);
    if (minPrice) url.searchParams.append("price_min", minPrice);
    if (maxPrice) url.searchParams.append("price_max", maxPrice);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
    }
    return await response.json();
}
