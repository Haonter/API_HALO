import mongoose from 'mongoose';

const personajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    rol_en_el_juego: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    biografia: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    imagen: {
        type: String,
        required: false,
        trim: true
    }
});


// Exportamos el modelo de Personaje
const Personaje = mongoose.model('Personaje', personajeSchema)

export default Personaje;