import Personaje from '../models/Personajes.js';
import mongoose from 'mongoose';


// GET
const obtenerPersonajes = async (req, res) =>{
    try{
        const personajes = await Personaje.find();
        res.status(200).json({
            status: 200,
            personajes
        });
    }catch(err){
        res.status(500).json({
            status: 500,
            mensaje: err
        })
    }
};








// POST
const crearPersonaje = async (req, res) =>{
    try{
        const nuevoPersonaje = new Personaje(req.body);
        const personajeGuardado = await nuevoPersonaje.save();
        
        res.status(201).json({
            codigo: 201,
            mensaje: "Personaje creado correctamente",
            detalles: {
                _id: personajeGuardado._id,
                nombre: personajeGuardado.nombre,
                rol_en_el_juego: personajeGuardado.rol_en_el_juego,
                descripcion: personajeGuardado.descripcion,
                biografia: personajeGuardado.biografia,
                imagen: personajeGuardado.imagen
            }
        });
    }catch(err){
        res.status(500).json({
            status: 500,
            mensaje: err
        })
    }
};





// PATCH / PUT








// DELETE

export {obtenerPersonajes, crearPersonaje};