import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
       /*errors: errors.array() //Obtiene los errores de validación como una matriz.*/ 
        estado: 'error',
        mensaje: 'Validación fallida',
        errores: errors.array().map(error => ({
            campo: error.path,
            mensaje: error.msg,
            }))
      });
  }
  next();
};