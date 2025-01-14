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
        body('image').optional().isString().withMessage('Bildpfad muss ein String sein'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price, mana, category_id, image } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO items (name, price, mana, category_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, price, mana, category_id, image || null]
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
        body('image').optional().isString().withMessage('Bildpfad muss ein String sein'),
    ],
    async (req, res) => {
        const { id } = req.params;
        const { name, price, mana, category_id, image } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await pool.query(
                'UPDATE items SET name = $1, price = $2, mana = $3, category_id = $4, image = $5 WHERE id = $6 RETURNING *',
                [name, price, mana, category_id, image || null, id]
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

// Kombinierte Daten aus Items und Kategorien abrufen
router.get('/details', async (req, res) => {
    const { category } = req.query; // Kategorie-Filter aus der Query-URL
    let query = `
        SELECT 
            items.id AS item_id,
            items.name AS item_name,
            items.price,
            items.mana,
            categories.name AS category_name
        FROM 
            items
        JOIN 
            categories
        ON 
            items.category_id = categories.id
    `;
    const params = [];
    if (category) {
        query += ` WHERE categories.name = $1`;
        params.push(category);
    }
    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverfehler');
    }
});

// Kategorie und zugehörige Items löschen
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Zuerst alle zugeordneten Items löschen
        await pool.query('DELETE FROM items WHERE category_id = $1', [id]);

        // Kategorie löschen
        const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Kategorie nicht gefunden');
        }

        res.json({ message: 'Kategorie und zugehörige Items erfolgreich gelöscht', category: result.rows[0] });
    } catch (err) {
        console.error('Fehler beim Löschen der Kategorie:', err.message);
        res.status(500).send('Serverfehler');
    }
});



// Suche, Filter und Sortierung für Items
router.get('/search', async (req, res) => {
    const { q, price_min, price_max, mana_min, mana_max, sort_by, order } = req.query;
    const params = [];
    let query = `
        SELECT 
            items.id AS item_id,
            items.name AS item_name,
            items.price,
            items.mana,
            categories.name AS category_name
        FROM 
            items
        JOIN 
            categories
        ON 
            items.category_id = categories.id
    `;

    // Bedingungen hinzufügen
    const conditions = [];
    try {
        if (q) {
            conditions.push(`(items.name ILIKE $${params.length + 1} OR categories.name ILIKE $${params.length + 1})`);
            params.push(`%${q}%`);
        }
        if (price_min) {
            if (isNaN(price_min)) throw new Error('price_min muss eine Zahl sein');
            conditions.push(`items.price >= $${params.length + 1}`);
            params.push(Number(price_min));
        }
        if (price_max) {
            if (isNaN(price_max)) throw new Error('price_max muss eine Zahl sein');
            conditions.push(`items.price <= $${params.length + 1}`);
            params.push(Number(price_max));
        }
        if (mana_min) {
            if (isNaN(mana_min)) throw new Error('mana_min muss eine Zahl sein');
            conditions.push(`items.mana >= $${params.length + 1}`);
            params.push(Number(mana_min));
        }
        if (mana_max) {
            if (isNaN(mana_max)) throw new Error('mana_max muss eine Zahl sein');
            conditions.push(`items.mana <= $${params.length + 1}`);
            params.push(Number(mana_max));
        }

        // Bedingungen an die Query anhängen
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // Sortierung hinzufügen
        const validSortColumns = ['price', 'mana', 'item_name']; // Erlaubte Spalten
        if (sort_by && validSortColumns.includes(sort_by)) {
            const sortOrder = order === 'desc' ? 'DESC' : 'ASC';
            query += ` ORDER BY ${sort_by} ${sortOrder}`;
        } else {
            query += ` ORDER BY items.name ASC`; // Standard-Sortierung
        }

        // Query ausführen
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler bei der Anfrage:', err.message);
        res.status(400).json({ error: err.message }); // Rückgabe eines klaren Fehlers
    }
});

// GET-Route für ein einzelnes Item basierend auf der ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Item nicht gefunden' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Fehler beim Abrufen des Items:', error);
        res.status(500).json({ error: 'Serverfehler' });
    }
});




module.exports = router;
