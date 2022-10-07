import React from 'react'
import { ToastContainer } from 'react-toastify'
import { crearUsuario } from '../../services/UsuarioService'
import NuevoObject from '../ui/NuevoObject'

export default function NuevoUsuario() {
  return (
    <div>
    <NuevoObject crear={crearUsuario} nombre={'Usuario'} email={true}/>
    <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  )
}
