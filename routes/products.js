const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');

router.get('/', productsController.leerProducto);

router.get('/:company_name',  productsController.obtenerCompanyName);

router.post('/', (req, res) => {
    const nuevoProducto = req.body;
    productsController.agregarProducto(nuevoProducto, res);
});

router.put('/', (req, res) => {
    const nuevoProducto = req.body;
    productsController.modificarProducto(nuevoProducto, res);
});

router.delete('/', (req, res) => {
    const { product } = req.body; 
    productsController.eliminarProducto(product, res);
});

module.exports = router;