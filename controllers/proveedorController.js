const fs = require('fs')
const path = require('path')
const uuid = require('uuid');
const databasePath = path.join(__dirname, '../data/proveedor.json')

const manejarError = (res, message) => {
    console.error(message);
    res.status(500).json({ error: 'Ocurrió un error interno' })
};

const leerProveedor = (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        
        const proveedores = JSON.parse(data);
        const page = parseInt(req.query.page) || 1; 
        const perPage = parseInt(req.query.perPage) || 10; 
        
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedProveedores = proveedores.slice(startIndex, endIndex);
        
        const totalProveedores = proveedores.length;
        
        res.status(200).json({
            totalProveedores,
            totalPages: Math.ceil(totalProveedores / perPage),
            currentPage: page,
            proveedores: paginatedProveedores
        });
    });
};


const obtenerUnProveedor = (req, res) => {
    const id = req.params.id; 
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const proveedores = JSON.parse(data);
        const proveedor = proveedores.find(proveedor => proveedor.id === id);
        if (proveedor) {
            res.status(200).json(proveedor);
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    });
};

const agregarProveedor = (nuevoProveedor, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const proveedores = JSON.parse(data);
        const nuevoID = uuid.v4();
        nuevoProveedor.id = nuevoID;
        proveedores.push(nuevoProveedor);
        
        fs.writeFile(databasePath, JSON.stringify(proveedores, null, 2), 'utf8', writeErr => {
            if (writeErr) {
                manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                return;
            }
            res.status(201).json({ message: 'Proveedor creado exitosamente', proveedor: nuevoProveedor });
        });
    });
};


const modificarProveedor = (nuevoProveedor, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const proveedores = JSON.parse(data);
        const proveedorExistenteIndex = proveedores.findIndex(proveedor => proveedor.id === nuevoProveedor.id);
        if (proveedorExistenteIndex !== -1) {
            const proveedorAnterior = proveedores[proveedorExistenteIndex];
            proveedores[proveedorExistenteIndex] = nuevoProveedor;
            fs.writeFile(databasePath, JSON.stringify(proveedores, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Proveedor modificado exitosamente', proveedorAnterior, proveedorModificado: nuevoProveedor});
            });
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    });
};

const eliminarProveedor = (id, res) => { 
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err);
            return;
        }
        const proveedores = JSON.parse(data); 
        const proveedorIndex = proveedores.findIndex(proveedor => proveedor.id === id); 
        if (proveedorIndex !== -1) {
            const proveedorEliminado = proveedores.splice(proveedorIndex, 1)[0];
            fs.writeFile(databasePath, JSON.stringify(proveedores, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Proveedor eliminado exitosamente', proveedorEliminado });
            });
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    });
};

module.exports = {
    leerProveedor,
    obtenerUnProveedor,
    agregarProveedor,
    modificarProveedor,
    eliminarProveedor 
};