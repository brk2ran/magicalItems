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
