const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path'); 
const uuid = require('uuid');
const databasePath = path.join(__dirname, '../data/users.json'); 

// Resto del código sigue igual...

const manejarError = (res, mensaje, err) => {
    console.error(mensaje, err);
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
};

const agregarUsuario = (nuevoUsuario, res) => {
    // Encriptar la contraseña antes de almacenarla
    bcrypt.hash(nuevoUsuario.password, 10, (err, hash) => {
        if (err) {
            manejarError(res, 'Error al encriptar la contraseña:', err);
            return;
        }
        
        // Genera un ID único para el nuevo usuario
        const nuevoID = uuid.v4();
        
        // Crear el objeto del nuevo usuario con la contraseña encriptada y el ID único
        const usuarioEncriptado = {
            id: nuevoID,
            username: nuevoUsuario.username,
            password: hash
        };
        
        // Leer los usuarios actuales del archivo JSON
        fs.readFile(databasePath, 'utf8', (readErr, data) => {
            if (readErr) {
                manejarError(res, 'Error al leer el archivo JSON:', readErr);
                return;
            }
            
            const usuarios = JSON.parse(data);
            
            // Verificar si ya existe un usuario con el mismo nombre de usuario
            const usuarioExistente = usuarios.find(user => user.username === usuarioEncriptado.username);
            if (usuarioExistente) {
                res.status(400).json({ error: 'Nombre de usuario ya existe' });
                return;
            }
            
            // Agregar el nuevo usuario a la lista y guardar en el archivo JSON
            usuarios.push(usuarioEncriptado);
            fs.writeFile(databasePath, JSON.stringify(usuarios, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    manejarError(res, 'Error al escribir en el archivo JSON:', writeErr);
                    return;
                }
                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            });
        });
    });
};

module.exports = {
    agregarUsuario,
};