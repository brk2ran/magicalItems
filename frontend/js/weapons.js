import { fetchItems } from './api.js';
import { loadComponent } from '/frontend/js/app.js';

async function loadWeapons() {
    try {
        const items = await fetchItems();
        const weapons = items.filter(item => item.category_id === 1); // Kategorie-ID für Waffen
        const container = document.querySelector('.items-list'); // Korrekte Klasse für das Grid

        // HTML für die Items generieren
        container.innerHTML = weapons.map(item => `
            <div class="item-card">
                <img src="${item.image || '/frontend/assets/images/placeholder.png'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Preis: ${item.price} Gold</p>
                <p>Mana: ${item.mana}</p>
                <a href="/frontend/categories/detail.html?id=${item.id}" class="details-btn">Details ansehen</a>
            </div>
        `).join('');
    } catch (error) {
        console.error("Fehler beim Laden der Waffen:", error);
    }
}

// Lädt die Header- und Footer-Komponenten
document.addEventListener('DOMContentLoaded', () => {
    loadWeapons();
    loadComponent(); // Header und Footer laden
});
