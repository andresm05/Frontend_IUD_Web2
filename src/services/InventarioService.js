import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todos los inventarios
 */
const obtenerInventarios = () => {
    return axiosConfig.get('inventarios', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un inventario por ID
 */
 const obtenerInventarioPorId = (inventarioId) => {
    return axiosConfig.get('inventarios/'+inventarioId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea un inventario
 */
const crearInventario = (data) => {
    return axiosConfig.post('inventarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un Inventario por ID
 */
const editarInventarioPorID = (inventarioId, data) => {
    return axiosConfig.put('inventarios/'+inventarioId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un Inventario por ID
 */
 const borrarInventarioPorId = (inventarioId) => {
    return axiosConfig.delete('inventarios/'+inventarioId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerInventarios,
    crearInventario,
    editarInventarioPorID,
    borrarInventarioPorId,
    obtenerInventarioPorId
}