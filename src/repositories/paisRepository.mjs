
//Implementa acceso real a mongoDB
import paisModel from "../models/paisModel.mjs";
import IRepository from "./IRepository.mjs";

class paisRepository extends IRepository {
    async obtenerPorId(id) {
        return await paisModel.findById(id);
    }

    async obtenerTodos() {
        return await paisModel.find({ creador: "Franco Simon Olmedo" }); //solo los creados por franco olmedo
    }

    async buscarPorAtributo(atributo, valor) {
        return await paisModel.find({ [atributo]: valor });
    }
  async crearPais (valor) {
    const nuevo = new paisModel(valor);
    return await nuevo.save();
  }

  async actualizarPais (id, valor) {
    return await paisModel.findByIdAndUpdate(id, valor, { new: true });
   
  }

  async eliminarPaisPorId(id) {
    return await paisModel.findByIdAndDelete(id);
  }

  async eliminarPaisPorNombre(nombre) {
    return await paisModel.findOneAndDelete({ nombre: nombre });
  }
}


export default new paisRepository;