// api.js

// Fetch all items
export async function fetchItems() {
    const response = await fetch("http://localhost:3000/api/items");
    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }
    return response.json();
}

// Fetch item by ID
export async function fetchItemById(id) {
    const response = await fetch(`http://localhost:3000/api/items/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch item by ID");
    }
    return response.json();
}
