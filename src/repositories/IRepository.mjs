//Segundo
//el repositorio "repositories" se encarga de la comunicar el modelo con la base de datos
//aca creo interfaz CRUD --estudiar que significa borrar antes de subir

class IRepository {
    obtenerPorId(id)
    {
        throw new Error ("Metodo 'obtenerPorId()' no implementado");
    }
    obtenerTodos()
    {
        throw new Error ("Metodo 'obtenerTodos()' no implementado");
    }
    buscarPorAtributo(atributo,valor)
    {
        throw new Error ("Metodo 'buscarPorAtributo()' no implementado");
    }
    crearPais(valor)
    {
        throw new Error ("Metodo 'crearPais()' no implementado");
    }
    actualizarPais(id, valor)
    {
        throw new Error ("Metodo 'actualizarPais()' no implementado");
    }
    eliminarPaisPorId(id)
    {
        throw new Error ("Metodo 'eliminarPaisPorId()' no implementado");
    }
    eliminarPaisPorNombre(nombre)
    {
        throw new Error ("Metodo 'eliminarPaisPorNombre()' no implementado");
    }
}
export default IRepository;