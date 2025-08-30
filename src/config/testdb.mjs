// testdb.mjs
import { connectDB } from './dbconfig.mjs';

(async () => {
  await connectDB();
  process.exit(0); // Cierra el proceso si todo salió bien
})();

//solo lo uso para probar la conexion a la base de datos porque es lo primero que creo 
// node testdb.mjs
