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
    await loadComponent();
});


