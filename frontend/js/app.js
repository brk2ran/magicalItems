import { fetchItems } from './api.js';

// Items im DOM rendern
async function renderItems() {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '<p>Lade Items...</p>';

    try {
        const items = await fetchItems();

        if (items.length === 0) {
            itemsContainer.innerHTML = '<p>Keine Items gefunden.</p>';
            return;
        }

        // Items als Grid hinzufügen
        itemsContainer.innerHTML = items.map(item => `
            <article class="item-card">
                <img src="${item.image || '../assets/images/default.png'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Preis: ${item.price} Gold</p>
                <p>Kategorie: ${item.category_id}</p>
                <a href="./detail.html?id=${item.id}" class="details-btn">Details</a>
            </article>
        `).join('');
    } catch (error) {
        console.error('Fehler beim Laden der Items:', error);
        itemsContainer.innerHTML = '<p>Fehler beim Laden der Items.</p>';
    }
}

// Beim Laden der Seite die Items rendern
document.addEventListener('DOMContentLoaded', renderItems);
