## 🚀 Cómo ejecutar el proyecto (React + .NET)

Este repositorio contiene una aplicación con frontend en **React** y backend en **ASP.NET Core**. A continuación, se detallan los pasos para ejecutar ambos proyectos en desarrollo.

### 📦 Requisitos previos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org/)
- [Visual Studio 2022+](https://visualstudio.microsoft.com/) o [VS Code](https://code.visualstudio.com/)

### 🔧 Backend (.NET Core)

1. Navega a la carpeta del backend:

   ```bash
   cd ./BS_ProductCatalog.Server
   ```

2. Restaura los paquetes:

   ```bash
   dotnet restore
   ```

3. Ejecuta el proyecto:

   ```bash
   dotnet run --launch-profile https
   ```

4. El backend debería estar corriendo en `https://localhost:7233` .

---

### 💻 Frontend (React)

1. Navega a la carpeta del frontend:

   ```bash
   cd ./bs_productcatalog.client
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación:

   ```bash
   npm run dev
   ```

4. El frontend debería estar disponible en `https://localhost:52281`.

---

### ✅ Listo

Una vez iniciados ambos servidores, puedes acceder a la aplicación en el navegador:\
👉 `https://localhost:52281`

---

### Funcionalidad del Proyecto

El proyecto tiene la finalidad de gestionar el catálogo de productos, permitiendo ver la lista de productos, agregar productos y filtrarlos.

---

### 📦 Product API Documentation

Este controlador gestiona operaciones básicas relacionadas con productos. Está ubicado en `api/Products` y utiliza el servicio `IProductService` para manejar la lógica de negocio.

---

### GET `/api/Products`

- **Descripción**: Obtiene la lista de todos los productos disponibles.
- **Respuesta exitosa**: `200 OK` con una lista de objetos `Product`.

#### Ejemplo de respuesta
```json
[
  {
    "id": 1,
    "name": "Laptop Lenovo",
    "description": "14\" Ryzen 5, 16GB RAM",
    "price": 899.99,
    "category": "Tecnología",
    "createdAt": "2025-07-26T20:45:00"
  }
]
```
---

### 🔹 Endpoints disponibles

| Método | Ruta                  | Descripción                              | Cuerpo (`Body`)         | Respuesta                           |
|--------|-----------------------|------------------------------------------|--------------------------|-------------------------------------|
| `GET`  | `/api/Products`       | Lista todos los productos disponibles    | —                        | `200 OK` con array de productos |
| `GET`  | `/api/Products/{id}`  | Obtiene un producto por su ID            | —                        | `200 OK` con el producto o `404` si no existe           |
| `POST` | `/api/Products`       | Crea un nuevo producto                   | Objeto `Product` en JSON | `200 OK` con el producto creado o `400 BadRequest` si hay errores |

