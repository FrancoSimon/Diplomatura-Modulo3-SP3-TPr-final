//Para conectar con base de datos
//lo creo desde el inicio, lo usamos al final para integrar todo en app.mjs
//importa libreria mongoose
import mongoose from 'mongoose';

export async function connectDB()
{
    try {
        await mongoose.connect('mongodb+srv://grupo-02:grupo02@cursadanodejs.ls9ii.mongodb.net/Node-js');
        console.log('Conexion exitosa a MongoDB grupo-02');
    } catch (error)
    {
        console.error('Error al conectar a MongoDB',error);
        process.exit(1);
    }
}