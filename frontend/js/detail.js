// detail.js
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");
  
    if (!itemId) {
      document.getElementById("item-details").innerHTML = "<p>Item ID fehlt!</p>";
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/items/${itemId}`);
      if (!response.ok) throw new Error("Fehler beim Laden der Item-Daten");
  
      const item = await response.json();
  
      document.getElementById("item-name").textContent = `Name: ${item.name}`;
      document.getElementById("item-price").textContent = `Preis: ${item.price} Gold`;
      document.getElementById("item-category").textContent = `Kategorie: ${item.category_id}`;
      document.getElementById("item-description").textContent = `Mana: ${item.mana}`;
    } catch (error) {
      console.error("Fehler:", error);
      document.getElementById("item-details").innerHTML = "<p>Fehler beim Laden des Items.</p>";
    }
  });
  