// app.mjs
import express from 'express';
import { connectDB } from './config/dbconfig.mjs';
import paisroutes from './routes/paisroutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';
import fs from 'fs/promises';
import paisModel from './models/paisModel.mjs';


const app = express();
const PORT = process.env.PORT || 3000;



// Configurar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, 'views', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());

// Configuración EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Rutas
app.get('/', (req, res) => {
  res.render('index', { title: 'Página Principal' });
});

app.use((req, res, next) => {
  res.locals.title = "Proyecto Países";
  next();
});

app.use('/api', paisroutes);

// Middleware error 404
app.use((req, res) => {
  res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// -------- INICIALIZACIÓN --------
async function init() {
  try {
    await connectDB();

    // Verificar si existen países con creador Franco Simon Olmedo
    const count = await paisModel.countDocuments({ creador: "Franco Simon Olmedo" });

    if (count === 0) {
      console.log("No existen países en la BD. Importando desde JSON...");

      const data = await fs.readFile(
        path.join(__dirname, 'utilities', 'paises-leng-espanol.json'),
        'utf-8'
      );
      const paises = JSON.parse(data);

      // Normalizar datos para cumplir con el schema
      const paisesNormalizados = paises.map(p => {
        const normalizado = {
          ...p,
          capital: Array.isArray(p.capital) ? p.capital : [p.capital],
          zonaHoraria: Array.isArray(p.zonaHoraria) ? p.zonaHoraria : [p.zonaHoraria],
          idiomas: Array.isArray(p.idiomas) ? p.idiomas : Object.values(p.idiomas)
        };

        // Solo asignar fronteras si existen
        if (p.fronteras && Array.isArray(p.fronteras) && p.fronteras.length > 0) {
          normalizado.fronteras = p.fronteras;
        }

        return normalizado;
      });

      await paisModel.insertMany(paisesNormalizados);
      console.log("Países importados correctamente.");
    } else {
      console.log("Países ya existen en la BD, no se importaron.");
    }

    // Recién iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Error inicializando la app:", err);
    process.exit(1);
  }
}

init();
