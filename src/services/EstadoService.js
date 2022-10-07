import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todos los estados
 */
const obtenerEstados = (estado = true) => {
    return axiosConfig.get('estadoEquipos?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un estado por ID
 */
 const obtenerEstadoPorID = (estadoID) => {
    return axiosConfig.get('estadoEquipos/'+estadoID, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea un estado
 */
const crearEstadoPorID = (data) => {
    return axiosConfig.post('estadoEquipos', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un estado por ID
 */
const editarEstadoPorID = (estadoID, data) => {
    return axiosConfig.put('estadoEquipos/'+estadoID, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un estado por ID
 */
 const borrarEstadoPorID = (estadoID) => {
    return axiosConfig.delete('estadoEquipos/'+estadoID, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerEstados,
    crearEstadoPorID,
    editarEstadoPorID,
    borrarEstadoPorID,
    obtenerEstadoPorID
}