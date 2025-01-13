// config/database.js
const { Pool } = require('pg');
require('dotenv').config(); // Um Umgebungsvariablen aus .env zu laden

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Verbindung aus der .env-Datei
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false // SSL für Produktionsumgebung
});

pool.on('connect', () => {
    console.log('Datenbank verbunden!');
});

pool.on('error', (err) => {
    console.error('Datenbankverbindungsfehler:', err.message);
});

module.exports = pool;
