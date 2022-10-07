import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { borrarMarcaPorID, editarMarcaPorID } from '../../services/MarcaService';
import CancelarBoton from '../ui/CancelarBoton';
import ConfirmarBoton from '../ui/ConfirmarBoton';
import EditarBoton from '../ui/EditarBoton';
import EliminarBoton from '../ui/EliminarBoton';
import ModalEliminar from '../ui/ModalEliminar';
import SeleccionEstado from '../ui/SeleccionEstado';

export default function TablaMarcas({marca, setConsulta}) {
    const [edit, setEdit] = useState(false);
    const [infoNuevaMarca, setInfoNuevaMarca] = useState({
      nombre: marca.nombre,
      estado: marca.estado,
    });
    const [mostrarAd, setMostrarAd] = useState(false);
  
    const editarMarca = async () => {
      try {
        await editarMarcaPorID(marca._id, infoNuevaMarca);
        setConsulta(true);
        setEdit(false);
        toast.success("Marca modificada con éxito");
      } catch (error) {
        toast.error("Error editando la Marca");
        setEdit(false);
      }
    };
  
    const borrarMarca = async () => {
      try {
        await borrarMarcaPorID(marca._id);
        setMostrarAd(false);
        setConsulta(true);
        toast.success("Marca eliminada");
      } catch (error) {
        toast.error("Error al eliminar la Marca");
      }
    };
  
    useEffect(() => {
      console.log(infoNuevaMarca);
    }, [infoNuevaMarca]);
  
    return (
      <tr>
        {edit ? (
          <>
            <td>{marca._id.slice(20)}</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                defaultValue={marca.nombre}
                onChange={(e) => {
                  setInfoNuevaMarca({
                    ...infoNuevaMarca,
                    nombre: e.target.value,
                  });
                }}
              />
            </td>
            <td>
              <SeleccionEstado
                setInfoObject={setInfoNuevaMarca}
                infoObject={infoNuevaMarca}
              />
            </td>
            <td>{dayjs(marca.fechaCreacion).format("DD/MM/YYYY")}</td>
            <td>{dayjs(marca.fechaActualizacion).format("DD/MM/YYYY")}</td>
            <td className="d-flex flex-row justify-content-around">
              <ConfirmarBoton editarObject={editarMarca} />
              <CancelarBoton setEdit={setEdit} />
            </td>
          </>
        ) : (
          <>
            <td>{marca._id.slice(20)}</td>
            <td>{marca.nombre}</td>
            <td>{marca.estado ? "Activo" : "Inactivo"}</td>
            <td>{dayjs(marca.fechaCreacion).format("DD/MM/YYYY")}</td>
            <td>{dayjs(marca.fechaActualizacion).format("DD/MM/YYYY")}</td>
            <td className="d-flex flex-row justify-content-around">
              <EditarBoton setEdit={setEdit} />
              <EliminarBoton setMostrarAd={setMostrarAd} />
            </td>
          </>
        )}
        <ModalEliminar
          mostrarAd={mostrarAd}
          setMostrarAd={setMostrarAd}
          objeto={"Marca"}
          eliminar={borrarMarca}
        />
        <ToastContainer position="bottom-center" autoClose={5000} />
      </tr>
    );
}
