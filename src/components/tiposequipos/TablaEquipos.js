import dayjs from "dayjs";
import React from "react";
import EditarBoton from "../ui/EditarBoton";
import EliminarBoton from "../ui/EliminarBoton";

export default function tablaEquipos({tipoEquipo}) {
  return <tr>
    <td>{tipoEquipo._id.slice(20)}</td>
    <td>{tipoEquipo.nombre}</td>
    <td>{tipoEquipo.estado ? 'Activo': 'Inactivo'}</td>
    <td>{dayjs(tipoEquipo.fechaCreacion).format('DD/MM/YYYY')}</td>
    <td>{dayjs(tipoEquipo.fechaActualizacion).format('DD/MM/YYYY')}</td>
    <td className="d-flex flex-row justify-content-around">
              <EditarBoton />
              <EliminarBoton />
            </td>
  </tr>;
}
