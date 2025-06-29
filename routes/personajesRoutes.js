import express from 'express';
import { crearPersonaje, obtenerPersonajes } from '../controllers/personajesControllers.js';

const router = express.Router();


// GET
router.get('/personajes', obtenerPersonajes);


// POST
router.post('/personajes', crearPersonaje);


// PATCH


// DELETE

export {router as PersonajesRoutes};
