import React from 'react'
import { ToastContainer } from 'react-toastify'
import { crearEstado } from '../../services/EstadoService'
import NuevoObject from '../ui/NuevoObject'

export default function NuevoEstado() {
  return (
    <div>
              <NuevoObject crear={crearEstado} nombre={"Estado"} email={false} />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  )
}
