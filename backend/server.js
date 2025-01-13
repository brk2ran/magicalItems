// server.js
const express = require('express');
const itemsRouter = require('./routes/items'); // Importiere die Items-Routen
const categoriesRouter = require('./routes/categories'); // Importiere die Kategorien-Routen
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Items-Routen
app.use('/api/items', itemsRouter); // Registriere die Route für /api/items
app.use('/api/categories', categoriesRouter); // Registriere die Kategorie-Routen

// Test-Route
app.get('/', (req, res) => {
    res.send('Server läuft erfolgreich!');
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

