const express = require('express');
const supplierController = require('../controllers/supplier');
const validateToken = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/', validateToken, supplierController.create);
router.get('/', validateToken, supplierController.getAll);
router.get('/:id', validateToken, supplierController.getById);
router.put('/:id', validateToken, supplierController.edit);
router.delete('/:id', validateToken, supplierController.deleteSupplier);
router.put('/activate/:id', validateToken, supplierController.activeSupplier);

module.exports = router;