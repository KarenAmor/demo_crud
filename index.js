const express = require('express');
const app = express();

// Importa las rutas
const proveedorRoutes = require('./routes/proveedor');
const productosRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Usa las rutas
app.use('/proveedores', proveedorRoutes)
app.use('/productos',  productosRoutes);
app.use('/users', usersRoutes);

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});