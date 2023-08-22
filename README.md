# API de Gestión de Proveedores y Productos

Esta API permite gestionar proveedores y productos a través de operaciones CRUD (Crear, Leer, Actualizar, Eliminar). La API está diseñada utilizando Node.js y Express.

## Uso

1. Inicia el servidor: `node index.js`
2. La API estará disponible en `http://localhost:3000`.

## Rutas

### Proveedores

- `GET /proveedores`: Obtener todos los proveedores.
- `GET /proveedores/:id`: Obtener un proveedor por su ID.
- `POST /proveedores`: Agregar un nuevo proveedor.
- `PUT /proveedores`: Modificar un proveedor existente.
- `DELETE /proveedores`: Eliminar un proveedor por su ID.

### Productos

- `GET /productos`: Obtener todos los productos.
- `GET /productos/:company_name`: Obtener productos por nombre de empresa.
- `POST /productos`: Agregar un nuevo producto.
- `PUT /productos`: Modificar un producto existente.
- `DELETE /productos`: Eliminar un producto por su nombre.

### Usuarios

- `POST /usuarios`: Agregar un nuevo usuario.

## Contribución

Si encuentras errores o tienes mejoras para esta API, siéntete libre de crear un Pull Request o una Issue en este repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.