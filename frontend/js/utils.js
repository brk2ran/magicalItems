// Header und Footer laden
async function loadComponent(selector, filePath) {
    const container = document.querySelector(selector);
    if (container) {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                container.innerHTML = await response.text();
            } else {
                console.error(`Fehler beim Laden von ${filePath}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Fehler beim Laden von ${filePath}: ${error}`);
        }
    }
}

// Fehlernachricht anzeigen
function showError(message) {
    const errorContainer = document.querySelector('#error-container');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    } else {
        alert(message); // Fallback
    }
}

// Exportieren der Utility-Funktionen
export { loadComponent, showError };
