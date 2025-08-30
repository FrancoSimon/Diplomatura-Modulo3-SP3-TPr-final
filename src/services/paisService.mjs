//Tercero
/*logica de negocio - procesa la logica entre controlador y base de datos, utilizando los metodos 
del repositorio para recuperar, buscar, cear, eliminar super heroes*/

import paisRepository from "../repositories/paisRepository.mjs";

export async function obtenerPaisPorId(id) {
    return await paisRepository.obtenerPorId(id);
}


export async function obtenerTodosLosPaises() {
    return await paisRepository.obtenerTodos();
}


export async function buscarPaisPorAtributo(atributo, valor) {
    return await paisRepository.buscarPorAtributo(atributo, valor);
}


export async function crearPais(valor) {
    return await paisRepository.crearPais(valor);
}


export async function actualizarPais(id, valor) {
    return await paisRepository.actualizarPais(id, valor);
}


export async function eliminarPaisPorId(id) {
    return await paisRepository.eliminarPaisPorId(id);
}


export async function eliminarPaisPorNombre(nombre) {
    return await paisRepository.eliminarPaisPorNombre(nombre);
}