const fs = require('fs')
const path = require('path')
const databasePath = path.join(__dirname, '../data/proveedor.json')

const manejarError = (res, message) => {
    console.error(message);
    res.status(500).json({ error: 'Ocurrió un error interno' })
};

const leerProveedor = (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            manejarError(res, 'Error al leer el archivo JSON:', err)
            return
        }
        const proveedor = JSON.parse(data)
        res.status(200).json(proveedor)
    })
}

const obtenerUnProveedor = (req, res) => {
    const id = parseInt(req.params.id);
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
        const proveedor = JSON.parse(data);
        proveedor.push(nuevoProveedor);
        fs.writeFile(databasePath, JSON.stringify(proveedor, null, 2), 'utf8', writeErr => {
            if (writeErr) {
                manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                return;
            }
            res.status(201).json({ message: 'Proveedor creado exitosamente' });
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
            proveedores[proveedorExistenteIndex] = nuevoProveedor;
            fs.writeFile(databasePath, JSON.stringify(proveedores, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Proveedor modificado exitosamente' });
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
            proveedores.splice(proveedorIndex, 1);
            fs.writeFile(databasePath, JSON.stringify(proveedores, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
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