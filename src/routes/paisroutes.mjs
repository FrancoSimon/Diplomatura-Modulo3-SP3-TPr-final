//las rutas actuan como puerta de entrada al sistema
//para conectar rutas HTTP con funciones del controlador
/*define los endpoints y mapea cada uno de sus respectvios controlador,
permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible*/


import express from 'express';
import {
    obtenerTodosLosPaisesController,
    mostrarFormularioCrearPais,
    agregarPaisController,
    editarPaisController,
    eliminarPaisController,
    mostrarDetallepais,
    mostrarFormularioEditarPais
} from '../controllers/paisController.mjs';
import {paisValidations, nombreParamValidation,idParamValidation} from '../validations/paisesValidations.mjs';
import { validate } from '../validations/validationmiddleware.mjs';
import { transformarDatosPais } from '../validations/transformarDatosPais.mjs';

const router = express.Router();

//rutas de páginas estáticas
router.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca de Nosotros' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contáctanos' });
});




//crud paises
router.get('/paises/crear', mostrarFormularioCrearPais);//mostrar la vista crear - ruta fija antes
router.get('/paises/:id', mostrarDetallepais);//ruta dinámica después

// mostar todos los paises
router.get('/paises', obtenerTodosLosPaisesController);//listado de paises

//editar pais
router.get('/paises/:id/editar', mostrarFormularioEditarPais);//mostrar la vista editar - agregado
// editar - Primero transformar datos, Luego validar, editar
router.put('/paises/:id/editar', transformarDatosPais, [...idParamValidation, ...paisValidations], validate, editarPaisController);

//crear pais 
router.post('/paises/agregar', transformarDatosPais, paisValidations, validate, agregarPaisController); //agregar pais

//borrar pais
router.delete('/paises/:id', idParamValidation, validate, eliminarPaisController);

export default router;