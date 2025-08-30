import { body, param } from 'express-validator';

export const paisValidations = [

        // Validación para el nombre del país - listo
    body('nombre')
        .trim()
        .escape() //escapa caracteres peligrosos (<,>,&)
        .notEmpty() //asegura eu llegue un valor
        .withMessage('El nombre oficial es requerido.')
        .isLength({ min: 3, max: 90 })
        .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

    // Validación para el nombre oficial del país - listo
    body('nombreOficial')
        .trim()
        .escape() //escapa caracteres peligrosos (<,>,&)
        .notEmpty() //asegura eu llegue un valor
        .withMessage('El nombre oficial es requerido.')
        .isLength({ min: 3, max: 90 })
        .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),


    // Validación para la capital del país - listo
    
    body('capital')
    //sanitizar antes para qeu acepte un string unico como un array
        .customSanitizer(value => {
            if (typeof value === 'string') {
            return [value.trim()];
            }
        return value;
        })

        .isArray({ min: 1 }) //array al menos una capital
        .withMessage('Debe proporcionar al menos una capital.')
        .custom((capitals) => { //recorro el array para validar cada elemento
        return capitals.every(cap => 
            typeof cap === 'string' &&
            cap.trim() &&
            cap.trim().length >= 3 &&
            cap.trim().length <= 90
      );
    })
    .withMessage('Cada capital debe ser un texto entre 2 y 90 caracteres.'),

// Validación para las fronteras (códigos de 3 letras mayúsculas) listo
body('fronteras')
    .notEmpty()
    .withMessage('El campo fronteras es obligatorio.')    
    .customSanitizer(value => {
    // Si llega un string "arg, chl, bol" → ["ARG","CHL","BOL"]
    if (typeof value === 'string') {
        return value.split(',')
        .map(b => b.trim().toUpperCase()) //fuerza mayúsculas
        .filter(b => b !== '');
    }

    // Si llega un array, también lo normaliza
    if (Array.isArray(value)) {
        return value.map(b => String(b).trim().toUpperCase())
        .filter(b => b !== '');
    }

    return value;
  })
  .custom(value => {
    // 1. Debe ser array y tener al menos un país
    if (!value || !Array.isArray(value) || value.length === 0) {
      throw new Error('Debe proporcionar al menos un país fronterizo.');
    }

    // 2. Cada código debe ser 3 letras mayúsculas
    for (const border of value) {
        if (!/^[A-Z]{3}$/.test(border)) {
        throw new Error('Cada país fronterizo debe ser un código de 3 letras mayúsculas.');
        }
    }
    return true;
    }),
    
    // Validación para el área (número positivo)
body('area')
        .notEmpty()
        .withMessage('El área es requerida.')
        .isFloat({ gt: 0 }) //estrictamente mayor a 0
        .withMessage('El área debe ser un número positivo mayor a 0.'),

    // Validación para la población (entero positivo)
body('poblacion')
        .notEmpty()
        .withMessage('La población es requerida.')
        .isInt({ gt: 0 }) 
        .withMessage('La población debe ser un número entero positivo mayor a 0.'),


    // Validación para el Gini 

body('gini')
  .customSanitizer(value => {
    if (typeof value === 'string') {
      const giniObj = {};
      value.split(',').forEach(pair => {
        const [year, val] = pair.split(':').map(p => p.trim());
        if (year && val) {
          giniObj[year] = parseFloat(val);
        }
      });
      return giniObj;
    }
    return value;
  })
  .custom(giniObj => {
    if (!giniObj || typeof giniObj !== 'object') {
      throw new Error('El campo Gini debe ser un objeto con años como claves.');
    }

    for (const [year, value] of Object.entries(giniObj)) {
      if (!/^\d{4}$/.test(year)) {
        throw new Error(`La clave "${year}" no es un año válido (debe tener 4 dígitos).`);
      }
      if (typeof value !== 'number' || isNaN(value) || value < 0 || value > 100) {
        throw new Error(`El valor del Gini para el año ${year} debe ser un número entre 0 y 100.`);
      }
    }

    return true;
  }),






    /*
    body('gini')
    ////sanitizar---convertir los valores a número porque por defecto serán strings
  .customSanitizer(value => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  })

        .custom(giniObj => {
        if (!giniObj || typeof giniObj !== 'object') {
            throw new Error('El campo Gini debe ser un objeto con años como claves.');
        }

        for (const [year, value] of Object.entries(giniObj)) {
            if (!/^\d{4}$/.test(year)) {
            throw new Error(`La clave "${year}" no es un año válido (debe tener 4 dígitos).`);
            }
            if (typeof value !== 'number' || value < 0 || value > 100) {
            throw new Error(`El valor del Gini para el año ${year} debe ser un número entre 0 y 100.`);
             }
         }
            return true;
     }), 
*/
    // Validación para los husos horarios / usar selector m,ultiple en el backend
body('timezones')
  .optional({ nullable: true }) // lo hace opcional
  .isArray({ min: 1 }).withMessage('Debe elegir al menos un huso horario.')
  .bail()
  .custom(arr => arr.every(tz => typeof tz === 'string' && tz.trim() !== ''))
  .withMessage('Cada huso horario debe ser un string válido'),

  //validar creador
  body('creador')
    .notEmpty()
    .withMessage('El creador es obligatorio.') // siempre debe estar presente
    .isString()
    .withMessage('El creador debe ser un texto válido.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El creador debe tener entre 3 y 100 caracteres.')
    .trim()
    .escape()  

];


// Validación para parametros de nombre del pais
export const nombreParamValidation = [
  param('nombre')
    .notEmpty().withMessage('El nombre del pais es requerido')
    .trim()
    .isLength({ min: 3, max: 90 }).withMessage('El nombre del pais debe tener entre 3 y 60 caracteres')
];

// Validación para parametros de ID del pais
export const idParamValidation = [
  param('id')
    .notEmpty().withMessage('El ID del pais es requerido')
    .isMongoId().withMessage('El ID del pais debe ser un ID válido')
];
