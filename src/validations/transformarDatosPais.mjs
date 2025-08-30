import { obtenerPaisPorId } from '../services/paisService.mjs';

// Función para transformar string separado por comas en array limpio
function transformarStringAArray(campo) {
  if (typeof campo === 'string') {
    return campo
      .split(',')
      .map(p => p.trim().toUpperCase()) // fronteras en mayúsculas
      .filter(p => p !== '');
  }
  return Array.isArray(campo) ? campo : [];
}

// Función para limpiar strings
function limpiarString(campo) {
  if (typeof campo === 'string') {
    return campo.trim();
  }
  return campo || '';
}

export async function transformarDatosPais(req, res, next) {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        mensaje: 'Datos del país no proporcionados correctamente'
      });
    }

    // Campos que deben convertirse en array si vienen como string
    const camposArray = ['fronteras', 'zonaHoraria'];
    camposArray.forEach(campo => {
      req.body[campo] = transformarStringAArray(req.body[campo]);
    });

    // Campos que deben limpiarse como string
    req.body.capital = limpiarString(req.body.capital);
    req.body.continente = limpiarString(req.body.continente);

    // Para PUT desde formulario HTML
    if (req.method === 'PUT' && req.get('content-type')?.includes('application/x-www-form-urlencoded')) {
      const { id } = req.params;
      const original = await obtenerPaisPorId(id);

      if (!original) {
        return res.status(404).json({ mensaje: 'País no encontrado' });
      }

      // Combinar con datos originales para mantener campos no proporcionados
      req.body = {
        ...original.toObject(),
        ...req.body,
        fronteras: req.body.fronteras,
        zonaHoraria: req.body.zonaHoraria,
        capital: req.body.capital,
        continente: req.body.continente
      };
    }

    next();
  } catch (error) {
    console.error('Error en transformarDatosPais:', error);
    return res.status(500).json({
      mensaje: 'Error al procesar los datos del país',
      error: error.message
    });
  }
}
