const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Importiere die Datenbankverbindung
const { body, validationResult } = require('express-validator');

// Alle Items abrufen
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverfehler');
    }
});

// Neues Item erstellen
router.post(
    '/',
    [
        body('name').isString().notEmpty().withMessage('Name ist erforderlich'),
        body('price').isFloat({ min: 0 }).withMessage('Preis muss positiv sein'),
        body('mana').isInt({ min: 0 }).withMessage('Mana muss positiv sein'),
        body('category_id').isInt().withMessage('Kategorie-ID muss eine Zahl sein'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price, mana, category_id } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO items (name, price, mana, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, price, mana, category_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Serverfehler');
        }
    }
);

// Item aktualisieren
router.put(
    '/:id',
    [
        body('name').isString().notEmpty().withMessage('Name ist erforderlich'),
        body('price').isFloat({ min: 0 }).withMessage('Preis muss positiv sein'),
        body('mana').isInt({ min: 0 }).withMessage('Mana muss positiv sein'),
        body('category_id').isInt().withMessage('Kategorie-ID muss eine Zahl sein'),
    ],
    async (req, res) => {
        const { id } = req.params;
        const { name, price, mana, category_id } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await pool.query(
                'UPDATE items SET name = $1, price = $2, mana = $3, category_id = $4 WHERE id = $5 RETURNING *',
                [name, price, mana, category_id, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).send('Item nicht gefunden');
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Serverfehler');
        }
    }
);

// Item löschen
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Item nicht gefunden');
        }
        res.json({ message: 'Item erfolgreich gelöscht', item: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverfehler');
    }
});

module.exports = router;
