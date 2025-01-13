const express = require('express');
const app = express();
const itemsRouter = require('./routes/items'); // Importiere die Items-Route

app.use(express.json()); // Middleware für JSON-Parsing
app.use('/api/items', itemsRouter); // Registriere die Route unter /api/items

app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
