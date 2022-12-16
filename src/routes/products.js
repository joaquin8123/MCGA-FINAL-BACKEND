const express = require('express');
const productController = require('../controllers/products');
const validateToken = require('../middlewares/validateRequest');
const router = express.Router();

router.post('/', validateToken, productController.create);
router.get('/', validateToken, productController.getAll);
router.get('/:id', validateToken, productController.getById);
router.put('/:id', validateToken, productController.edit);
router.delete('/:id', validateToken, productController.deleteProduct);

module.exports = router;