import React from 'react'
import { ToastContainer } from 'react-toastify'
import { crearTipoEquipo } from '../../services/TipoEquipoService'
import NuevoObject from '../ui/NuevoObject'

export default function NuevoTipoEquipo() {
  return (
    <div>
    <NuevoObject crear={crearTipoEquipo} nombre={'Tipo De Equipo'}/>
    <ToastContainer position="bottom-center" autoClose={5000} />
    </div>

  )
}

