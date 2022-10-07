import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import {borrarEstadoPorID, editarEstadoPorID} from '../../services/EstadoService'
import CancelarBoton from '../ui/CancelarBoton';
import ConfirmarBoton from '../ui/ConfirmarBoton';
import EditarBoton from '../ui/EditarBoton';
import EliminarBoton from '../ui/EliminarBoton';
import ModalEliminar from '../ui/ModalEliminar';
import SeleccionEstado from '../ui/SeleccionEstado';

export default function TablaEstados({estado, setConsulta}) {
    const [edit, setEdit] = useState(false);
    const [infoNuevoEstado, setInfoNuevoEstado] = useState({
      nombre: estado.nombre,
      estado: estado.estado,
    });
    const [mostrarAd, setMostrarAd] = useState(false);
  
    const editarEstado = async () => {
      try {
        await editarEstadoPorID(estado._id, infoNuevoEstado);
        setConsulta(true);
        setEdit(false);
        toast.success("Estado modificado con éxito");
      } catch (error) {
        toast.error("Error editando el Estado");
        setEdit(false);
      }
    };
  
    const borrarEstado = async () => {
      try {
        await borrarEstadoPorID(estado._id);
        setMostrarAd(false);
        setConsulta(true);
        toast.success("Estado eliminado");
      } catch (error) {
        toast.error("Error al eliminar el Estado");
      }
    };
  
    useEffect(() => {
      console.log(infoNuevoEstado);
    }, [infoNuevoEstado]);
  
    return (
      <tr>
        {edit ? (
          <>
            <td>{estado._id.slice(20)}</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                defaultValue={estado.nombre}
                onChange={(e) => {
                  setInfoNuevoEstado({
                    ...infoNuevoEstado,
                    nombre: e.target.value,
                  });
                }}
              />
            </td>
            <td>
              <SeleccionEstado
                setInfoObject={setInfoNuevoEstado}
                infoObject={infoNuevoEstado}
              />
            </td>
            <td>{dayjs(estado.fechaCreacion).format("DD/MM/YYYY")}</td>
            <td>{dayjs(estado.fechaActualizacion).format("DD/MM/YYYY")}</td>
            <td className="d-flex flex-row justify-content-around">
              <ConfirmarBoton editarObject={editarEstado} />
              <CancelarBoton setEdit={setEdit} />
            </td>
          </>
        ) : (
          <>
            <td>{estado._id.slice(20)}</td>
            <td>{estado.nombre}</td>
            <td>{estado.estado ? "Activo" : "Inactivo"}</td>
            <td>{dayjs(estado.fechaCreacion).format("DD/MM/YYYY")}</td>
            <td>{dayjs(estado.fechaActualizacion).format("DD/MM/YYYY")}</td>
            <td className="d-flex flex-row justify-content-around">
              <EditarBoton setEdit={setEdit} />
              <EliminarBoton setMostrarAd={setMostrarAd} />
            </td>
          </>
        )}
        <ModalEliminar
          mostrarAd={mostrarAd}
          setMostrarAd={setMostrarAd}
          objeto={"Estado"}
          eliminar={borrarEstado}
        />
        <ToastContainer position="bottom-center" autoClose={5000} />
      </tr>
    );
}
