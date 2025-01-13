export const fetchItems = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/items'); // Stelle sicher, dass der Port korrekt ist
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API-Fehler:', error);
        throw error; // Fehler weitergeben
    }
};
