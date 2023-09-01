const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const proveedorControllerValidate = require('../controllers/proveedorController.validate.js');

router.get('/', proveedorControllerValidate.leerProveedor, proveedorController.leerProveedor);

router.get('/:id', proveedorControllerValidate.obtenerUnProveedor, proveedorController.obtenerUnProveedor);

router.post('/', (req, res) => {
    const nuevoProveedor = req.body;
    proveedorControllerValidate.agregarProveedor, proveedorController.agregarProveedor(nuevoProveedor, res);
});

router.put('/', (req, res) => {
    const nuevoProveedor = req.body;
    proveedorControllerValidate.modificarProveedor, proveedorController.modificarProveedor(nuevoProveedor, res);
});

router.delete('/', (req, res) => {
    const { id } = req.body;
    proveedorControllerValidate.eliminarProveedor, proveedorController.eliminarProveedor(id, res); 
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