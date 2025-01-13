const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Importiere die Datenbankverbindung
const { body, validationResult } = require('express-validator');

// Alle Kategorien abrufen
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverfehler');
    }
});

// Neue Kategorie erstellen
router.post(
    '/',
    [body('name').isString().notEmpty().withMessage('Name ist erforderlich')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO categories (name) VALUES ($1) RETURNING *',
                [name]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Serverfehler');
        }
    }
);

// Kategorie aktualisieren
router.put(
    '/:id',
    [body('name').isString().notEmpty().withMessage('Name ist erforderlich')],
    async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await pool.query(
                'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
                [name, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).send('Kategorie nicht gefunden');
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Serverfehler');
        }
    }
);

// Kategorie löschen
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Starte Löschen der Kategorie mit ID: ${id}`);

        // Prüfen, ob die Kategorie existiert
        const categoryCheck = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (categoryCheck.rows.length === 0) {
            console.log('Kategorie nicht gefunden');
            return res.status(404).send('Kategorie nicht gefunden');
        }

        // Zuerst alle zugeordneten Items löschen
        await pool.query('DELETE FROM items WHERE category_id = $1', [id]);

        // Kategorie löschen
        const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        res.json({ message: 'Kategorie und zugehörige Items erfolgreich gelöscht', category: result.rows[0] });
    } catch (err) {
        console.error('Fehler beim Löschen der Kategorie:', err.message);
        res.status(500).send('Serverfehler');
    }
});

// Kategorien mit der Anzahl der zugeordneten Items
router.get('/with-count', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                categories.id AS category_id,
                categories.name AS category_name,
                COUNT(items.id) AS item_count
            FROM 
                categories
            LEFT JOIN 
                items
            ON 
                categories.id = items.category_id
            GROUP BY 
                categories.id
            ORDER BY 
                categories.name ASC
        `);

        res.json(result.rows);
    } catch (err) {
        console.error('Fehler bei der Abfrage:', err.message);
        res.status(500).send('Serverfehler');
    }
});



module.exports = router;
