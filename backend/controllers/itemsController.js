const pool = require('../config/database'); // Importiere die Datenbankverbindung

// Alle Items abrufen
const getItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getItems };
