import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todas las marcas
 */
const obtenerMarcas = (estado = true) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta una marca por ID
 */
 const obtenerMarcaPorID = (marcaID) => {
    return axiosConfig.get('marcas/'+marcaID, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea una marca
 */
const crearMarca = (data) => {
    return axiosConfig.post('marcas', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza una marca por ID
 */
const editarMarcaPorID = (marcaID, data) => {
    return axiosConfig.put('marcas/'+marcaID, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra una marca por ID
 */
 const borrarMarcaPorID = (marcaID) => {
    return axiosConfig.delete('marcas/'+marcaID, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerMarcas,
    crearMarca,
    editarMarcaPorID,
    borrarMarcaPorID,
    obtenerMarcaPorID
}