const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.get('/', proveedorController.leerProveedor);

router.get('/:id', proveedorController.obtenerUnProveedor);

router.post('/', (req, res) => {
    const nuevoProveedor = req.body;
    proveedorController.agregarProveedor(nuevoProveedor, res);
});

router.put('/', (req, res) => {
    const nuevoProveedor = req.body;
    proveedorController.modificarProveedor(nuevoProveedor, res);
});

router.delete('/', (req, res) => {
    const { id } = req.body;
    proveedorController.eliminarProveedor(id, res); 
});

module.exports = router;