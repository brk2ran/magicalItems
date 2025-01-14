// server.js
const cors = require('cors');
const express = require('express');
const itemsRouter = require('./routes/items'); // Importiere die Items-Routen
const categoriesRouter = require('./routes/categories'); // Importiere die Kategorien-Routen
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3001'], // Erlaube beide Origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

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
