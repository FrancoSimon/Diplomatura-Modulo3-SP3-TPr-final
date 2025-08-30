//cuarto con quinto(views)
/*los controladores coordinan la logica y definen que responder segun lo que pida el cliente. 
El controlador actua como intermediario, gestionando las solicitudes del cliente y llama a la 
capa de servicios para realizar las operaciones necesarias.*/
//Utilizando las vistas para presentar los datoss

import {
  obtenerPaisPorId,
  obtenerTodosLosPaises,
  buscarPaisPorAtributo,
  crearPais,
  actualizarPais,
  eliminarPaisPorId,
  eliminarPaisPorNombre
} from "../services/paisService.mjs";

export async function mostrarDetallepais(req, res) {
  try {
    const { id } = req.params;
   // console.log('ID recibido:', id);

    let paisobtenido = await obtenerPaisPorId(id);
    //console.log('Pais obtenido:', paisobtenido);

    if (!paisobtenido) {
      return res.status(404).send("Pais no encontrado");
    }


    //Convertir documento Mongoose a objeto plano
    paisobtenido = paisobtenido.toObject();
    //Asegurarse que gini sea un objeto simple
    if (paisobtenido.gini instanceof Map) {
      paisobtenido.gini = Object.fromEntries(paisobtenido.gini);
    }
    
    res.render('detallePais', { title: `Detalle de ${paisobtenido.nombre}`, paisobtenido }); //titulo con pais obtenido
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener el detalle del Pais",
      error: error.message
    });
  }
};



/*
export async function mostrarDetallepais(req, res) {
  try {
     
    const { id } = req.params;
    console.log('ID recibido:', id);
    const paisobtenido = await obtenerPaisPorId(id);
    console.log('Pais obtenido:', paisobtenido);

    if (!paisobtenido) {
        return res.status(404).send("Pais no encontrado");
    }

      res.render('detallePais', { paisobtenido});
    } catch (error) {
      res.status(500).send({
      mensaje: "Error al obtener el detalle del Pais",
      error: error.message
    });
  }
};
*/


//GET obtener todos los paises
/*sin objeto plano gini
export async function obtenerTodosLosPaisesController(req, res) {
  try {
    const todosPaises = await obtenerTodosLosPaises();
	res.render('dashboard',{title: 'Listado de Países', paises: todosPaises }); //renderiza la vista dashboard.ejs/con titulo pagina
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los paises",
        error: error.message,
      });
  }
}
*/
//GET obtener todos los paises convirtiendo map a objeto plano
export async function obtenerTodosLosPaisesController(req, res) {
  try {
    let todosPaises = await obtenerTodosLosPaises();

    // convertir gini de Map → Objeto plano para todos
    todosPaises = todosPaises.map(p => {
      const pais = p.toObject ? p.toObject() : p;
      if (pais.gini instanceof Map) {
        pais.gini = Object.fromEntries(pais.gini);
      }
      return pais;
    });

    res.render('dashboard',{title: 'Listado de Países', paises: todosPaises });
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los paises",
        error: error.message,
      });
  }
}


//Mostrar vista crear pais
export async function mostrarFormularioCrearPais(req, res) {
    try {     
        res.render('addPais', { title: 'Agregar País' });   //cambiar nombre de addPais y borrar comentario    
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de creación', error: error.message });
    }    
} 


//POST para crear pais
export async function agregarPaisController(req, res) {
  try {
    
    const nuevoPais = req.body;
 
    const paisCreado = await crearPais(nuevoPais);
   

    res.redirect('/api/paises'); //redirigimos a la vista corregir con pais y borrar o modificar mentario

  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al crear el pais",
        error: error.message,
      });
  }
}



// Mostar vista - editar Pais
export async function mostrarFormularioEditarPais(req, res) {
    try {
        const { id } = req.params;

        const paisAEditar = await obtenerPaisPorId(id);
        console.log(paisAEditar)
        if (!paisAEditar) {
            return res.status(404).send({ mensaje: 'Pais no encontrado para editar' });
        }

        res.render('editarPais', { title: 'Editar País', paisAEditar });// modificar la vista y borrar o modificar comentario
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de edición', error: error.message });
    }
}


//PUT actualizar un pais por ID --agregado modificar
export async function editarPaisController(req, res) {
  try {
    const { id } = req.params;
     //pedir datos que vienen  del middleware
    const datosActualizados = req.body;
    
    const paisActualizado = await actualizarPais(id, datosActualizados);
    console.log(paisActualizado);

    if (!paisActualizado) {
      return res.status(404).send({ mensaje: "Pais no encontrado" });
    }
    res.redirect('/api/paises'); ////modificar la vista y borrar o modificar comentario

  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al actualizar el Pais",
        error: error.message,
      });
  }
}


//DELETE eliminar un pais por ID
export async function eliminarPaisController(req, res) {
  try {
    const { id } = req.params;
    const paisEliminado = await eliminarPaisPorId(id);
    console.log(paisEliminado)
    if (!paisEliminado) {
      return res.status(404).send({ mensaje: "Pais no encontrado" });
    }

    res.redirect('/api/paises'); ////modificar la vista y borrar o modificar comentario
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al eliminar el Pais",
        error: error.message,
      });
  }
}