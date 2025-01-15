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

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent(); // Lädt Header und Footer

    // Logik für den "Neues Item"-Button
    const addItemBtn = document.createElement('button');
    addItemBtn.id = 'add-item-btn';
    addItemBtn.textContent = '+ Neues Item';
    addItemBtn.style.marginLeft = '1rem';
    addItemBtn.style.padding = '0.5rem 1rem';
    addItemBtn.style.backgroundColor = '#4a4a4a';
    addItemBtn.style.color = '#fff';
    addItemBtn.style.border = 'none';
    addItemBtn.style.borderRadius = '5px';
    addItemBtn.style.fontSize = '1rem';
    addItemBtn.style.cursor = 'pointer';
    addItemBtn.style.transition = 'background-color 0.3s ease';

    addItemBtn.addEventListener('mouseover', () => {
        addItemBtn.style.backgroundColor = '#333';
    });

    addItemBtn.addEventListener('mouseout', () => {
        addItemBtn.style.backgroundColor = '#4a4a4a';
    });

    addItemBtn.addEventListener('click', () => {
        window.location.href = '/frontend/components/edit.html';
    });

    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.appendChild(addItemBtn);
    }
});