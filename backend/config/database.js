const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
    if (err) {
        console.error('Fehler bei der Datenbankverbindung:', err.message);
    } else {
        console.log('Datenbankverbindung erfolgreich!');
    }
});

module.exports = pool;
