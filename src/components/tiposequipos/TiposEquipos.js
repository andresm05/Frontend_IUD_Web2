import React, { useEffect, useState } from "react";
import { obtenerTiposEquipos } from "../../services/TipoEquipoService";
import CrearBoton from "../ui/CrearBoton";
import TablaEquipos from "./TablaEquipos";
import ReactLoading from "react-loading";
import { Alert } from "@mui/material";

export default function TipoEquipos() {
  const [tipoEquipos, setTipoEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);

  const listTipoEquipos = async () => {
    try {
      const { data } = await obtenerTiposEquipos(query);
      setTipoEquipos(data);
      console.log(data);
      setLoading(false);
      setError(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
    }
  };

  const cambiarSwich = () =>{
    setQuery(!query)
  }

  useEffect(() => {
    listTipoEquipos();
  }, [query]);

  return (
    <div>
      {error && (
        <div>
          <Alert severity="error">Error al cargar la información</Alert>
        </div>
      )}
      {loading ? (
        <ReactLoading
          type="bubbles"
          color="yellow"
          height={"20%"}
          width={"20%"}
        />
      ) : (
        <div>
          <div className="d-flex flex-row justify-content-between">
            <CrearBoton nombre="Tipo de equipo" pag="/nuevoTipoDeEquipo" />
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked = {query}
                onChange={cambiarSwich}
              />
              <label className="form-check-label" for="flexSwitchCheckChecked">
                (Activo / Inactivo)
              </label>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Creado</th>
                <th scope="col">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {tipoEquipos.map((tipoEquipo) => {
                return (
                  <TablaEquipos tipoEquipo={tipoEquipo} key={tipoEquipo._id} />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
