import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  borrarUsuarioPorID,
  editarUsuarioPorID,
} from "../../services/UsuarioService";
import CancelarBoton from "../ui/CancelarBoton";
import ConfirmarBoton from "../ui/ConfirmarBoton";
import EditarBoton from "../ui/EditarBoton";
import EliminarBoton from "../ui/EliminarBoton";
import ModalEliminar from "../ui/ModalEliminar";
import SeleccionEstado from "../ui/SeleccionEstado";

export default function TablaUsuarios({ usuario, setConsulta}) {
  const [edit, setEdit] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    nombre: usuario.nombre,
    estado: usuario.estado,
    email: usuario.email,
  });
  const [mostrarAd, setMostrarAd] = useState(false);

  const editarUsuario = async () => {
    try {
      await editarUsuarioPorID(usuario._id, infoNuevoUsuario);
      setEdit(false);
      setConsulta(true);
      toast.success("Usuario modificado con éxito");
    } catch (error) {
      toast.error("Error editando el usuario");
      setEdit(false);
    }
  };

  const borrarUsuario = async () => {
    try {
      await borrarUsuarioPorID(usuario._id);
      setMostrarAd(false);
      setConsulta(true);
      setEdit(false);
      toast.success("Usuario eliminado");
    } catch (error) {
      toast.error("Error al eliminar el Usuario");
    }
  };

  useEffect(() => {
    console.log(infoNuevoUsuario);
  }, [infoNuevoUsuario]);

  return (
    <tr>
      {edit ? (
        <>
          <td>{usuario._id.slice(20)}</td>
          <td>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              defaultValue={usuario.nombre}
              onChange={(e) => {
                setInfoNuevoUsuario({
                  ...infoNuevoUsuario,
                  nombre: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <SeleccionEstado
              setInfoObject={setInfoNuevoUsuario}
              infoObject={infoNuevoUsuario}
            />
          </td>
          <td>
            <input
              type="email"
              className="form-control"
              placeholder="Email@gmail.com"
              aria-label="Email"
              aria-describedby="basic-addon1"
              defaultValue={usuario.email}
              onChange={(e) => {
                setInfoNuevoUsuario({
                  ...infoNuevoUsuario,
                  email: e.target.value,
                });
              }}
            />
          </td>
          <td>{dayjs(usuario.fechaCreacion).format("DD/MM/YYYY")}</td>
          <td>{dayjs(usuario.fechaActualizacion).format("DD/MM/YYYY")}</td>
          <td className="d-flex flex-row justify-content-around">
            <ConfirmarBoton editarObject={editarUsuario} />
            <CancelarBoton setEdit={setEdit} />
          </td>
        </>
      ) : (
        <>
          <td>{usuario._id.slice(20)}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
          <td>{usuario.email}</td>
          <td>{dayjs(usuario.fechaCreacion).format("DD/MM/YYYY")}</td>
          <td>{dayjs(usuario.fechaActualizacion).format("DD/MM/YYYY")}</td>
          <td className="d-flex flex-row justify-content-around">
            <EditarBoton setEdit={setEdit} />
            <EliminarBoton setMostrarAd={setMostrarAd} />
          </td>
        </>
      )}
      <ModalEliminar
        mostrarAd={mostrarAd}
        setMostrarAd={setMostrarAd}
        objeto={"Usuario"}
        eliminar={borrarUsuario}
      />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </tr>
  );
}
