import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todos los usuarios
 */
const obtenerUsuarios = (estado = true) => {
    return axiosConfig.get('usuarios?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un usuario por ID
 */
 const obtenerUsuarioPorID = (usuarioID) => {
    return axiosConfig.get('usuarios/'+usuarioID, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea un usuario
 */
const crearUsuario = (data) => {
    return axiosConfig.post('usuarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un usuario por ID
 */
const editarUsuarioPorID = (usuarioID, data) => {
    return axiosConfig.put('usuarios/'+usuarioID, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un usuario por ID
 */
 const borrarUsuarioPorID = (usuarioID) => {
    return axiosConfig.delete('usuarios/'+usuarioID, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerUsuarios,
    crearUsuario,
    editarUsuarioPorID,
    borrarUsuarioPorID,
    obtenerUsuarioPorID
}