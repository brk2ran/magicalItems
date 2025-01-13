const { Pool } = require('pg');

// Verbindung manuell einrichten
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'magische_items',
    password: 'Webtech24',
    port: 5432,
});

(async () => {
    console.log('Teste Verbindung zur Datenbank...');
    try {
        const res = await pool.query('SELECT NOW()'); // Test-Query
        console.log('Verbindung erfolgreich:', res.rows[0].now);
    } catch (err) {
        console.error('Fehler bei der Verbindung:', err.message);
    } finally {
        pool.end();
        console.log('Verbindung geschlossen.');
    }
})();
