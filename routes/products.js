const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const productsControllerValidate = require('../controllers/productController.validate');

router.get('/', productsController.leerProducto);

router.get('/company/:company_name', productsControllerValidate.obtenerCompanyName, productsController.obtenerCompanyName);

router.get('/product/:product', productsControllerValidate.obtenerProducto, productsController.obtenerProducto);

router.post('/', productsControllerValidate.agregarProducto, (req, res) => {
    const nuevoProducto = req.body;
    productsController.agregarProducto(nuevoProducto, res);
});

router.put('/', productsControllerValidate.modificarProducto, (req, res) => {
    const nuevoProducto = req.body;
    productsController.modificarProducto(nuevoProducto, res);
});

router.delete('/', productsControllerValidate.eliminarProducto, (req, res) => {
    const { id } = req.body; 
    productsController.eliminarProducto(id, res);
});

router.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      res.status(400).json({
        type: err.type, // will be "query" here, but could be "headers", "body", or "params"
        message: err.error.toString()
      });
    } else { next(err); }
  });
module.exports = router;