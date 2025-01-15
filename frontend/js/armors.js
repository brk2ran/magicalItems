import { fetchItems } from './api.js';
import { loadComponent } from '/frontend/js/app.js';

async function loadArmors() {
    try {
        const items = await fetchItems();
        const armors = items.filter(item => item.category_id === 3); // Kategorie-ID 3 = Rüstungen
        const container = document.querySelector('.items-list'); // Selektor angepasst

        container.innerHTML = armors.map(item => `
            <div class="item-card">
                <img src="${item.image || '/frontend/assets/images/placeholder.png'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Preis: ${item.price} Gold</p>
                <p>Mana: ${item.mana}</p>
                <a href="/frontend/categories/detail.html?id=${item.id}" class="details-btn">Details ansehen</a>
            </div>
        `).join('');
    } catch (error) {
        console.error("Fehler beim Laden der Rüstungen:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadArmors();
    loadComponent();
});
