import { fetchItems } from './api.js';
import { loadComponent } from '/frontend/js/app.js';

async function loadItemDetails() {
    try {
        const params = new URLSearchParams(window.location.search);
        const itemId = params.get('id');

        if (!itemId) {
            console.error('Keine ID gefunden');
            return;
        }

        const items = await fetchItems();
        const item = items.find(item => item.id === parseInt(itemId));

        if (!item) {
            console.error('Item nicht gefunden');
            return;
        }

        const container = document.querySelector('.detail-container');
        container.innerHTML = `
            <div class="item-card">
                <img src="${item.image || '/frontend/assets/images/placeholder.png'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Preis: ${item.price} Gold</p>
                <p>Mana: ${item.mana}</p>
                <p>${item.description || 'Keine Beschreibung verfügbar.'}</p>
            </div>
        `;

        const backLink = document.getElementById('back-link');
        backLink.href = `/frontend/categories/${item.category_id === 1 ? 'weapons' : item.category_id === 2 ? 'potions' : 'armors'}/index.html`; // Dynamisch anhand der ID
    } catch (error) {
        console.error('Fehler beim Laden der Details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadItemDetails();
    loadComponent();
});
