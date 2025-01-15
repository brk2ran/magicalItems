import { fetchItems } from './api.js';
import { loadComponent } from '/frontend/js/app.js';

async function loadPotions() { // Funktionsname korrigiert
    try {
        const items = await fetchItems();
        const potions = items.filter(item => item.category_id === 2); // Kategorie-ID 2 = Tränke
        const container = document.querySelector('.items-list'); // Selektor angepasst

        container.innerHTML = potions.map(item => `
            <div class="item-card">
                <img src="${item.image || '/frontend/assets/images/placeholder.png'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Preis: ${item.price} Gold</p>
                <p>Mana: ${item.mana}</p>
                <a href="/frontend/categories/detail.html?id=${item.id}" class="details-btn">Details ansehen</a>
            </div>
        `).join('');
    } catch (error) {
        console.error("Fehler beim Laden der Tränke:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPotions();
    loadComponent();
});
