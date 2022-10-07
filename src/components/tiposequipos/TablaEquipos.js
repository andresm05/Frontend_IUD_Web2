import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import EditarBoton from "../ui/EditarBoton";
import EliminarBoton from "../ui/EliminarBoton";
import ConfirmarBoton from "../ui/ConfirmarBoton";
import CancelarBoton from "../ui/CancelarBoton";
import SeleccionEstado from "../ui/SeleccionEstado";
import {
  editarTipoEquipoPorID,
  borrarTipoEquipoPorID,
} from "../../services/TipoEquipoService";
import { toast, ToastContainer } from "react-toastify";
import ModalEliminar from "../ui/ModalEliminar";

export default function TablaEquipos({ tipoEquipo, setConsulta }) {
  const [edit, setEdit] = useState(false);
  const [infoNuevoTipoEq, setInfoNuevoTipoEq] = useState({
    nombre: tipoEquipo.nombre,
    estado: tipoEquipo.estado,
  });
  const [mostrarAd, setMostrarAd] = useState(false);

  const editarTipoEquipo = async () => {
    try {
      console.log(infoNuevoTipoEq);
      await editarTipoEquipoPorID(tipoEquipo._id, infoNuevoTipoEq);
      setEdit(false);
      setConsulta(true);
      toast.success("Tipo de equipo modificado con éxito");
    } catch (error) {
      toast.error("Error editando el tipo de equipo");
      setEdit(false);
    }
  };

  const borrarTipoEquipo = async () => {
    try {
      await borrarTipoEquipoPorID(tipoEquipo._id);
      setMostrarAd(false);
      setConsulta(true);
      toast.success("Tipo De Equipo eliminado");
    } catch (error) {
      toast.error("Error al eliminar el Tipo De Equipo");
    }
  };

  useEffect(() => {
    console.log(infoNuevoTipoEq);
  }, [infoNuevoTipoEq]);

  return (
    <tr>
      {edit ? (
        <>
          <td>{tipoEquipo._id.slice(20)}</td>
          <td>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              defaultValue={infoNuevoTipoEq.nombre}
              onChange={(e) => {
                setInfoNuevoTipoEq({
                  ...infoNuevoTipoEq,
                  nombre: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <SeleccionEstado
              setInfoObject={setInfoNuevoTipoEq}
              infoObject={infoNuevoTipoEq}
            />
          </td>
          <td>{dayjs(tipoEquipo.fechaCreacion).format("DD/MM/YYYY")}</td>
          <td>{dayjs(tipoEquipo.fechaActualizacion).format("DD/MM/YYYY")}</td>
          <td className="d-flex flex-row justify-content-around">
            <ConfirmarBoton editarObject={editarTipoEquipo} />
            <CancelarBoton setEdit={setEdit} />
          </td>
        </>
      ) : (
        <>
          <td>{tipoEquipo._id.slice(20)}</td>
          <td>{tipoEquipo.nombre}</td>
          <td>{tipoEquipo.estado ? "Activo" : "Inactivo"}</td>
          <td>{dayjs(tipoEquipo.fechaCreacion).format("DD/MM/YYYY")}</td>
          <td>{dayjs(tipoEquipo.fechaActualizacion).format("DD/MM/YYYY")}</td>
          <td className="d-flex flex-row justify-content-around">
            <EditarBoton setEdit={setEdit} />
            <EliminarBoton setMostrarAd={setMostrarAd} />
          </td>
        </>
      )}
      <ModalEliminar
        mostrarAd={mostrarAd}
        setMostrarAd={setMostrarAd}
        objeto={"Tipo De Equipo"}
        eliminar={borrarTipoEquipo}
      />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </tr>
  );
}
