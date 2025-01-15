const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Statische Dateien aus dem 'frontend'-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'frontend')));

// Routen für spezifische HTML-Dateien
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/kontakt.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
});

app.get('/impressum.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'impressum.html'));
});

// API-Endpunkte (falls vorhanden)
app.get('/api/items', (req, res) => {
  // Beispiel-API-Response
  res.json({ message: 'API ist aktiv' });
});

// Fallback für nicht gefundene Routen
app.use((req, res) => {
  res.status(404).send('404 - Seite nicht gefunden');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
