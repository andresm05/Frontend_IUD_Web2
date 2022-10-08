import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { borrarInventarioPorId } from "../../services/InventarioService";
import EliminarBoton from "../ui/EliminarBoton";
import ModalEliminar from "../ui/ModalEliminar";

export default function CardInventarios({ inventario, setConsulta }) {
  const [mostrarAd, setMostrarAd] = useState(false);

  const borrarInventario = async () => {
    try {
      await borrarInventarioPorId(inventario._id);
      setMostrarAd(false);
      setConsulta(true);
      toast.success("Inventario eliminado");
    } catch (error) {
      toast.error("Error al eliminar el Inventario");
    }
  };
  return (
    <div className="card m-2" Style="width: 18rem;">
      <img className="card-img-top" src={inventario.foto} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{`Serial: ${inventario.serial}`}</h5>
        <ul className="list-group">
          <li className="list-group-item">Modelo: {inventario.modelo}</li>
          <li className="list-group-item">precio: {inventario.precio}</li>
          <li className="list-group-item">
            fecha de compra: {dayjs(inventario.fechaCompra).format("MMMM-YYYY")}
          </li>
          <li className="list-group-item">
            usuario:{" "}
            {inventario.usuario === null ? (
              <>No definido</>
            ) : (
              <>{inventario.usuario.email}</>
            )}
          </li>
          <li className="list-group-item">
            marca:{" "}
            {inventario.marca === null ? (
              <>No Definido</>
            ) : (
              <>{inventario.marca.nombre}</>
            )}
          </li>
          <li className="list-group-item">
            tipo de Equipo:{" "}
            {inventario.equipo === null ? (
              <>No definido</>
            ) : (
              <>{inventario.tipoEquipo.nombre}</>
            )}
          </li>
          <li className="list-group-item">
            Estado:{" "}
            {inventario.estado === null ? (
              <>No definido</>
            ) : (
              <>{inventario.estado.nombre}</>
            )}
          </li>
        </ul>
        <div className="d-flex flex-row justify-content-around p-2">
          <EliminarBoton setMostrarAd={setMostrarAd} />
          <Link
            to={{
              pathname: "/editarInventario",
              search: `${inventario._id}`,
              state: inventario,
            }}
            className="btn btn-outline-primary"
            data-toggle="tooltip"
            data-placement="top"
            title="Editar"
          >
            <i class="fa-solid fa-marker"></i>
          </Link>
        </div>
      </div>
      <ModalEliminar
        mostrarAd={mostrarAd}
        setMostrarAd={setMostrarAd}
        objeto={"Inventario"}
        eliminar={borrarInventario}
      />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}
