const express = require('express');
const path = require('path');
const app = express();

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname)));

// Starte den Server
const PORT = 3001;
app.listen(PORT, () => console.log(`Frontend läuft auf http://localhost:${PORT}`));
