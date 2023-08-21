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
}
const obtenerProducto = (req, res) => {
    const product = req.params.product;
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const productos = JSON.parse(data);
        console.log("productos: ", productos)
        const producto = productos.find(producto => producto.product === product);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
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
            res.status(201).json({ message: 'Producto creado exitosamente' });
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
        const productoExistenteIndex = productos.findIndex(producto => producto.product === nuevoProducto.product);
        if (productoExistenteIndex !== -1) {
            productos[productoExistenteIndex] = nuevoProducto;
            fs.writeFile(databasePath, JSON.stringify(productos, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Producto modificado exitosamente' });
            });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
};

const eliminarProducto = (product, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const productos = JSON.parse(data);
        const productoIndex = productos.findIndex(producto => producto.product === product);
        if (productoIndex !== -1) {
            productos.splice(productoIndex, 1);
            fs.writeFile(databasePath, JSON.stringify(productos, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
};

module.exports = {
    leerProducto,
    obtenerCompanyName,
    obtenerProducto,
    agregarProducto,
    modificarProducto,
    eliminarProducto 
};