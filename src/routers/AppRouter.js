
import React from 'react'
import NavBar from '../components/ui/NavBar'
import { Routes, Route } from 'react-router-dom'
import TiposEquipos from '../components/tiposequipos/TiposEquipos'
import Estados from '../components/estados/Estados'
import Marcas from '../components/marcas/Marcas'
import Usuarios from '../components/usuarios/Usuarios'
import Inventarios from '../components/inventarios/Inventarios'
import NotFound from '../components/ui/NotFound'
import NuevoTipoEquipo from '../components/tiposequipos/NuevoTipoEquipo'
import NuevoUsuario from '../components/usuarios/NuevoUsuario'
import NuevaMarca from '../components/marcas/NuevaMarca'
import NuevoEstado from '../components/estados/NuevoEstado'
import NuevoInventario from '../components/inventarios/NuevoInventario'
import EditarInventario from '../components/inventarios/EditarInventario'

export default function AppRouter() {
  return (
    <div>
        <NavBar title={'IUD'}/>
        <main className='container'>
            <Routes >
                <Route path='/' element={<TiposEquipos />} />
                <Route path='/estados' element={<Estados />} />
                <Route path='/marcas' element={<Marcas />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/inventarios' element={<Inventarios />} />
                <Route path='*' element={<NotFound />} />
                <Route path = '/nuevoTipoDeEquipo' element={<NuevoTipoEquipo/>}/>
                <Route path = '/nuevoUsuario' element={<NuevoUsuario/>}/>
                <Route path = '/nuevaMarca' element={<NuevaMarca/>}/>
                <Route path = '/nuevoEstado' element={<NuevoEstado/>}/>
                <Route path = '/nuevoInventario' element={<NuevoInventario/>}/>
                <Route path = '/editarInventario' element={<EditarInventario/>}/>
            </Routes>
        </main>
    </div>
  )
}
