const express = require('express');
const {
    getItems,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/itemsController'); // Importiere die Controller

const router = express.Router();

// Routen definieren
router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
