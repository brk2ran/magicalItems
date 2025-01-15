// edit.js: Frontend-Logik zum Hinzufügen eines Items
const form = document.getElementById("item-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Standardformularverhalten verhindern

    // Formulardaten erfassen
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const mana = parseInt(document.getElementById("mana").value, 10);
    const category_id = parseInt(document.getElementById("category").value, 10); // Kategorie-ID
    const image = document.getElementById("image").value.trim(); // Bild-URL (optional)

    // Validierung der Eingaben
    if (!name || price <= 0 || mana < 0 || !category_id || !image) {
        alert("Bitte alle Felder korrekt ausfüllen.");
        return;
    }

    // API-Aufruf zum Hinzufügen des Items
    try {
        const response = await fetch("http://localhost:3000/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                mana,
                category_id,
                image,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Fehler beim Hinzufügen des Items:", errorData);
            alert(`Fehler: ${errorData.errors.map((err) => err.msg).join(", ")}`);
            return;
        }

        const newItem = await response.json();
        console.log("Item erfolgreich hinzugefügt:", newItem);
        alert("Item erfolgreich hinzugefügt!");

        // Nach dem Hinzufügen zurück zur Hauptseite navigieren
        window.location.href = "/frontend/index.html";
    } catch (error) {
        console.error("Netzwerkfehler oder Serverfehler:", error);
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
});
