const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../data/products.json');

const manejarError = (res, message) => {
    console.error(message);
    res.status(500).json({ error: 'Ocurrió un error interno' });
};

const leerProducto = (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const productos = JSON.parse(data);
        res.status(200).json(productos);
    });
};
const obtenerCompanyName = (req, res) => {
    const company_name = req.params.company_name;
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const companies = JSON.parse(data);
        const company= companies.filter(company => company.company_name === company_name);
        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ error: 'Compañia no encontrada' });
        }
    });
};

const agregarProducto = (nuevoProducto, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const productos = JSON.parse(data);
        productos.push(nuevoProducto);
        fs.writeFile(databasePath, JSON.stringify(productos, null, 2), 'utf8', writeErr => {
            if (writeErr) {
                manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                return;
            }
            res.status(201).json({ message: 'Producto creado exitosamente' , producto: nuevoProducto  });
        });
    });
};

const modificarProducto = (nuevoProducto, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const productos = JSON.parse(data);
        const productoExistenteIndex = productos.findIndex(producto => producto.id === nuevoProducto.id);
        if (productoExistenteIndex !== -1) {
            const productoAnterior = productos[productoExistenteIndex];
            productos[productoExistenteIndex] = nuevoProducto;
            fs.writeFile(databasePath, JSON.stringify(productos, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Producto modificado exitosamente', productoAnterior, productoModificado: nuevoProducto });
            });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
};

const eliminarProducto = (id, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const productos = JSON.parse(data);
        const productoIndex = productos.findIndex(producto => producto.id === id);
        if (productoIndex !== -1) {
            const productoEliminado = productos.splice(productoIndex, 1)[0];
            fs.writeFile(databasePath, JSON.stringify(productos, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Producto eliminado exitosamente', productoEliminado });
            });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
};

module.exports = {
    leerProducto,
    obtenerCompanyName,
    agregarProducto,
    modificarProducto,
    eliminarProducto 
};