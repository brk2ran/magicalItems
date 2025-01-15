// app.js
import { fetchItems } from './api.js';

// Load the items and render them on the page
async function loadItems() {
    try {
        const items = await fetchItems();
        const container = document.getElementById("items-container");
        container.innerHTML = items
            .map(
                (item) => `
                <div class="item-card">
                    <img src="${item.image || '/frontend/assets/images/placeholder.png'}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Preis: ${item.price} Gold</p>
                    <a href="./categories/detail.html?id=${item.id}" class="details-btn">Details ansehen</a>
                </div>
            `
            )
            .join('');
    } catch (error) {
        console.error("Fehler beim Laden der Items:", error);
    }
}

// Ensure loadItems is not redefined
if (typeof window.loadItems === 'undefined') {
    window.loadItems = loadItems;
}

export async function loadComponent() {
    try {
        const headerResponse = await fetch('/frontend/components/header.html');
        const footerResponse = await fetch('/frontend/components/footer.html');

        document.getElementById("header").innerHTML = await headerResponse.text();
        document.getElementById("footer").innerHTML = await footerResponse.text();
    } catch (error) {
        console.error("Fehler beim Laden der Komponenten:", error);
    }
}

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
