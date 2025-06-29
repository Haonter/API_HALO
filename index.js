import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import DDoS from 'ddos';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();    

import conectarDB from './database/conectarDB.js';

// Conectamos la BD
conectarDB();

const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares generales
app.use(cors({origin: '*'})); // Habilita la API a responder a todos los origenes (IP's)
app.use(express.json()); // Nor permite leer el JSON que se envie como cuerpo en las peticiones
app.use(express.urlencoded({extended: true})); // Nos permite recibir datos de formularios
app.use(morgan(':method | :url | :date[clf] | :response-time ms')); // Morgan nos permite ver la informacion de la peticion, e incluso crear un log de eventos


// Middlewares de seguridad
const ddos = new DDoS({burst: 30, limit: 50}); // Limtamos a 50 solicitudes por minuto con un maximo de 30 solicitudes en ráfaga
app.use(ddos.express); // Aplicamos el middleware de DDoS
app.use(helmet()); // Helmet nos ayuda a proteger la aplicacion de ataques comunes como XSS, clickjacking, etc.

const limitador = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar cada IP a 100 solicitudes por ventana
    message: "Demasiadas solicitudes desde esta IP, por favor intente más tarde.",
    // skip: (req, res) => {
    //     // Excluir ciertas rutas de la limitación
    //     return req.ip === '192.168.1.1'; // Localhost
    // }
});
app.use(limitador);





// Endpoints
import { personajesRoutes } from './routes/personajesRoutes.js';
app.use(personajesRoutes);


app.get('/', (req, res)=>{
    res.status(200).send(`
        <html>
            <head>
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
                <title>HALO API - UNSC Database</title>
            </head>
            <body class="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-black text-green-300" style="font-family: 'Orbitron', monospace;">
                <!-- Header -->
                <div class="container mx-auto px-4 py-8">
                    <div class="text-center mb-12 border-2 border-green-400 bg-black bg-opacity-70 rounded-lg p-8">
                        <h1 class="text-7xl text-green-400 font-black mb-4" style="text-shadow: 0 0 30px #4ade80;">HALO API</h1>
                        <p class="text-2xl text-green-300 mb-4">UNSC SPARTAN DATABASE SYSTEM</p>
                        <div class="text-green-500 animate-pulse text-lg">[ CONEXIÓN CORTANA ESTABLECIDA ]</div>
                    </div>

                    <!-- Endpoints Grid -->
                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <!-- GET All -->
                        <div class="border-2 border-green-500 bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-80 transition-all">
                            <h3 class="text-2xl text-green-400 font-bold mb-3">GET /personajes</h3>
                            <p class="text-green-300 mb-3">Recuperar todos los registros SPARTAN</p>
                            <div class="bg-green-900 bg-opacity-50 p-3 rounded text-sm">
                                <code>curl -X GET http://localhost:3000/personajes</code>
                            </div>
                        </div>

                        <!-- GET One -->
                        <div class="border-2 border-green-500 bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-80 transition-all">
                            <h3 class="text-2xl text-green-400 font-bold mb-3">GET /personajes/:id</h3>
                            <p class="text-green-300 mb-3">Recuperar SPARTAN específico</p>
                            <div class="bg-green-900 bg-opacity-50 p-3 rounded text-sm">
                                <code>curl -X GET http://localhost:3000/personajes/117</code>
                            </div>
                        </div>

                        <!-- POST -->
                        <div class="border-2 border-blue-500 bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-80 transition-all">
                            <h3 class="text-2xl text-blue-400 font-bold mb-3">POST /personajes</h3>
                            <p class="text-blue-300 mb-3">Registrar nuevo SPARTAN</p>
                            <div class="bg-blue-900 bg-opacity-50 p-3 rounded text-sm">
                                <code>curl -X POST http://localhost:3000/personajes -H "Content-Type: application/json" -d '{"nombre":"Master Chief"}'</code>
                            </div>
                        </div>

                        <!-- PUT -->
                        <div class="border-2 border-yellow-500 bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-80 transition-all">
                            <h3 class="text-2xl text-yellow-400 font-bold mb-3">PUT /personajes/:id</h3>
                            <p class="text-yellow-300 mb-3">Actualizar registro SPARTAN</p>
                            <div class="bg-yellow-900 bg-opacity-50 p-3 rounded text-sm">
                                <code>curl -X PUT http://localhost:3000/personajes/117 -H "Content-Type: application/json" -d '{"status":"Active"}'</code>
                            </div>
                        </div>

                        <!-- DELETE -->
                        <div class="border-2 border-red-500 bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-80 transition-all col-span-2">
                            <h3 class="text-2xl text-red-400 font-bold mb-3">DELETE /personajes/:id</h3>
                            <p class="text-red-300 mb-3">Eliminar registro SPARTAN [AUTORIZACIÓN REQUERIDA]</p>
                            <div class="bg-red-900 bg-opacity-50 p-3 rounded text-sm">
                                <code>curl -X DELETE http://localhost:3000/personajes/117</code>
                            </div>
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="text-center border-2 border-green-400 bg-black bg-opacity-70 rounded-lg p-6">
                        <div class="text-green-400 text-xl mb-2">ESTADO DEL SISTEMA</div>
                        <div class="grid grid-cols-3 gap-4 text-sm">
                            <div>API: <span class="text-green-400">OPERACIONAL</span></div>
                            <div>DB: <span class="text-green-400">CONECTADA</span></div>
                            <div>SEGURIDAD: <span class="text-green-400">ACTIVA</span></div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `);
});



// Middleware para manejar rutas inexistentes
app.use((req,res)=>{
    res.status(404).send(`
            <html>
                <head>
                    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
                    <title>404 - UNSC Database Error</title>
                </head>
                <body class="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-black text-red-300 flex items-center justify-center" style="font-family: 'Orbitron', monospace;">
                    <div class="container mx-auto px-4 text-center">
                        <div class="border-2 border-red-400 bg-black bg-opacity-80 rounded-lg p-12 max-w-2xl mx-auto">
                            <div class="text-8xl text-red-500 font-black mb-6" style="text-shadow: 0 0 30px #ef4444;">404</div>
                            <h1 class="text-4xl text-red-400 font-bold mb-4">ACCESO DENEGADO</h1>
                            <p class="text-xl text-red-300 mb-6">RECURSO NO ENCONTRADO EN LA BASE DE DATOS UNSC</p>
                            <div class="text-red-500 animate-pulse text-lg mb-8">[ ERROR: RUTA NO AUTORIZADA ]</div>
                            
                            <div class="bg-red-900 bg-opacity-50 p-4 rounded-lg mb-6">
                                <p class="text-red-200 text-sm">CORTANA: "Jefe, esta ruta no existe en nuestros registros."</p>
                            </div>
                            
                            <a href="/" class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors border-2 border-red-400">
                                VOLVER AL SISTEMA PRINCIPAL
                            </a>
                        </div>
                    </div>
                </body>
            </html>
    `)
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 