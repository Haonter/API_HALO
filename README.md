# Halo API
Una API REST para obtener información sobre el universo de Halo, incluyendo personajes, vehículos y armas.

## 🚀 Características

- **Personajes**: Información detallada de los personajes del universo Halo
- **Vehículos**: Datos sobre los vehículos icónicos de la saga
- **Armas**: Especificaciones y detalles de las armas disponibles

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB/Mongoose** - Base de datos NoSQL y ODM
- **CORS** - Manejo de Cross-Origin Resource Sharing
- **Helmet** - Middleware de seguridad para Express
- **Morgan** - Logger de peticiones HTTP
- **Express Rate Limit** - Limitador de solicitudes por IP
- **DDoS** - Protección contra ataques DDoS
- **Dotenv** - Manejo de variables de entorno
- **Nodemon** - Herramienta de desarrollo para reinicio automático

## 📋 Endpoints

### Personajes
```
GET /personajes
GET /personajes/id/:id    -- Proximo Stream
POST /personajes
PATCH /personajes/:id     -- Proximo Stream
DELETE /personajes/:id    -- Proximo Stream
```

### Vehículos  
```
GET /vehiculos          -- Proximo Stream
GET /vehiculos/id/:id   -- Proximo Stream
POST /vehiculos         -- Proximo Stream
PATCH /vehiculos/:id    -- Proximo Stream
DELETE /vehiculos/:id   -- Proximo Stream
```

### Armas
```
GET /armas             -- Proximo Stream
GET /armas/id/:id      -- Proximo Stream
POST /armas            -- Proximo Stream
PATCH /armas/:id       -- Proximo Stream
DELETE /armas/:id      -- Proximo Stream
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone [https://github.com/Haonter/API_HALO.git]

# Instalar dependencias
npm install

# Ejecutar el servidor
npm start
```

## 👨‍💻 Autor

**Diego Rodriguez**

- 💻 GitHub: [@haonter](https://github.com/haonter)
- 📺 Twitch: [@didacusdev](https://twitch.tv/didacusdev)
- 📸 Instagram: [@didacusdev](https://instagram.com/didacusdev)
- 🌐 Web: [diegorodriguez.dev](https://diegorodriguez.dev)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.