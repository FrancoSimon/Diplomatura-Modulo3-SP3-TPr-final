Objetivos
Realizar operaciones CRUD (crear, leer, actualizar, borrar) con países.
Guardar la información en MongoDB.
Calcular promedio de Gini, suma de población y suma de área.
Buscar países por nombre, mostrar su ID y permitir edición/borrado.
Implementar un servidor web con vistas y tabla de países.

Tecnologías usadas
JavaScript (Node.js).
Express como framework web.
EJS + express-ejs-layouts para vistas y layouts.
HTML y tailwindcss para estructura y estilos.
express-validator para validaciones en backend.
method-override para soportar PUT y DELETE en formularios.
Mongoose para modelar y conectar la base de datos.

Pasos de ejecución
Instalar dependencias: npm install
Ejecutar la aplicación: node app.mjs
Abrir en el navegador: http://localhost:3000

Consideraciones especiales
Variables de entorno necesarias: PORT=3000 y connectDB: mongodb+srv://grupo-02:grupo02@cursadanodejs.ls9ii.mongodb.net/Node-js
Al iniciar, la app conecta la base de datos y carga datos "paises-leng-espanol.json"
Dashboard incluye tabla de países, estadísticas (población, área, Gini) y opciones de CRUD.




