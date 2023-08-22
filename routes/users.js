const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/', (req, res) => {
    const nuevoUsuario = req.body;
    userController.agregarUsuario(nuevoUsuario, res);
})

module.exports = router;