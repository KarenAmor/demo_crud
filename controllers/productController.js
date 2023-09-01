const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../data/products.json');
const uuid = require('uuid'); 

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
        const page = parseInt(req.query.page) || 1; // Página actual, valor predeterminado: 1
        const perPage = parseInt(req.query.perPage) || 10; // Elementos por página, valor predeterminado: 10
        
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedProductos = productos.slice(startIndex, endIndex);
        
        const totalProductos = productos.length;
        
        res.status(200).json({
            totalProductos,
            totalPages: Math.ceil(totalProductos / perPage),
            currentPage: page,
            productos: paginatedProductos
        });
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
        const filteredCompanies = companies.filter(company =>
            company.company_name && company.company_name.toLowerCase() && company.company_name.toLowerCase().includes(company_name.toLowerCase())
        );

        const totalResults = filteredCompanies.length;

        if (totalResults > 0) {
            res.status(200).json({
                totalResults,
                companies: filteredCompanies
            });
        } else {
            res.status(404).json({ error: 'Compañia no encontrada' });
        }
    });
};

const obtenerProducto = (req, res) => {
    const productName = req.params.product;
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }

        const companies = JSON.parse(data);
        const filteredCompanies = companies.filter(company =>
            company.product && company.product.toLowerCase() && company.product.toLowerCase().includes(productName.toLowerCase())
        );              

        const totalProducts = filteredCompanies.length;

        if (totalProducts > 0) {
            res.status(200).json({
                totalProducts,
                companies: filteredCompanies
            });
        } else {
            res.status(404).json({ error: 'Productos no encontrados' });
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
        const nuevoID = uuid.v4();
        nuevoProducto.id = nuevoID;
        productos.push(nuevoProducto);
        fs.writeFile(databasePath, JSON.stringify(productos, null, 2), 'utf8', writeErr => {
            if (writeErr) {
                manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                return;
            }
            res.status(201).json({ message: 'Producto creado exitosamente', producto: nuevoProducto });
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
    obtenerCompanyName ,
    obtenerProducto,
    agregarProducto,
    modificarProducto,
    eliminarProducto 
};