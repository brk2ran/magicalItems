import { fetchItems } from './api.js';

// Items im DOM rendern
async function renderItems() {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '<p>Lade Items...</p>';

    const items = await fetchItems();

    if (items.length === 0) {
        itemsContainer.innerHTML = '<p>Keine Items gefunden.</p>';
        return;
    }

    // Items dynamisch hinzufügen
    itemsContainer.innerHTML = items.map(item => `
        <div class="item-card">
            <h2>${item.name}</h2>
            <p>Preis: ${item.price} Gold</p>
            <p>Kategorie: ${item.category_id}</p>
            <a href="./detail.html?id=${item.id}" class="details-link">Details anzeigen</a>
        </div>
    `).join('');
}

// Beim Laden der Seite die Items rendern
document.addEventListener('DOMContentLoaded', renderItems);
