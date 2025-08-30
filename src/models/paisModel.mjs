//Primero
//DEFINO LOS ESQUEMAS Y ESTRUCTURAS DE LAS ENTIDADES
import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema
({
//listo requerido
  nombre: {
    type: String,
    required: [true, 'El nombre del país es obligatorio'],
    trim: true
  },
  //listo requerido
  nombreOficial: {
    type: String,
    required: [true, 'El nombre oficial del país es obligatorio'],
    trim: true
  },
  //listo requerido
  capital: {
      type: [String], 
        required: [true, 'La capital es obligatorio'],
        validate: {
            validator: function(v) {
        return v.length > 0;
      },
      message: 'Debe haber al menos una capital'
        }
  },
 //listo no requerido
  bandera: {
    type: String,
    default: null
  },
  //listo no requerido
  continente: {
    type: [String],
    default: []  
  },
  //frontera listo requerdio
  /*
fronteras: {
  type: [{
    type: String,
    uppercase: true,          //Convierte siempre a mayúsculas
    trim: true,               
    match: /^[A-Z]{3}$/,      //Debe ser un código de 3 letras mayúsculas
  }],
  required: [true, 'El campo fronteras es obligatorio'], 
  validate: {
    validator: function (arr) {
      return Array.isArray(arr) && arr.length > 0;  // Al menos un país
    },
    message: 'Debe proporcionar al menos un país fronterizo.'
  }
},
*/
//lo modifique para poder cargar el archivo json
fronteras: {
  type: [{
    type: String,
    uppercase: true,          // Convierte siempre a mayúsculas
    trim: true,               
    match: /^[A-Z]{3}$/,      // Debe ser un código de 3 letras mayúsculas
  }],
  default: [], // Si no hay fronteras, queda array vacío
  validate: {
    validator: function (arr) {
      // Permite array vacío o con códigos válidos
      return Array.isArray(arr);
    },
    message: 'El campo fronteras debe ser un array de códigos de país válidos.'
  }
},


//area listo requerdio
area: {
    type: Number,
    required: [true, 'El área es obligatoria'],
    min: [1, 'El área debe ser un número positivo mayor a 0.']
  },
  //listo requerido
  poblacion: {
    type: Number,
    required: [true, 'La población es obligatoria'],
    min: [1, 'La población debe ser un número positivo mayor a 0.']
  },
  //listo no requerido
  idiomas: {
    type: [String],
    default: []    
  },
//gini listo no requerido
  gini: {
  type: Map, //campo será un Mapa (un objeto con pares clave → valor).
  of: Number, // tipo de valor dentro del map será un número (float)
  required: false
},

//liosto no requerdio
  zonaHoraria: {
    type: [String], 
    default: []
  },
  //requerido
  creador: {
    type: String,
    required: [true, 'El creador es obligatorio'],
  }
});

const pais = mongoose.model('Pais',paisSchema,'Grupo-02');
export default pais

