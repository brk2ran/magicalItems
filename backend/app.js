const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/itemsRoutes'); // Importiere die Items-Routen
require('./config/database'); // Verbindung zur Datenbank

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API-Routen
app.use('/api/items', itemsRoutes); // Binde die Items-Routen ein

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

module.exports = app;
