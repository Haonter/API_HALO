import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const conectarDB = async ()=>{
    try{
        console.log("Estableciendo conexion a la Base de Datos...");
        const conexion = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Conectado a la base de datos: ${conexion.connection.name}`);
    }catch(err){
        console.error(`Ocurrio un error al intentar conectar. ${err.message}`);
    }
};

export default conectarDB;