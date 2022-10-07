import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { obtenerMarcas } from "../../services/MarcaService";
import ReactLoading from "react-loading";
import CrearBoton from "../ui/CrearBoton";
import TablaMarcas from "./TablaMarcas";
import { ToastContainer } from "react-toastify";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [consulta, setConsulta] = useState(true);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);

  const cambiarSwich = () => {
    setConsulta(true);
    setQuery(!query);
  };

  useEffect(() => {
    const listMarcas = async () => {
      try {
        const { data } = await obtenerMarcas(query);
        setMarcas(data);
        console.log(data);
        setLoading(false);
        setError(false);
        setConsulta(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError(true);
      }
    };
    if (consulta) {
      listMarcas();
    }
  }, [consulta, query]);

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
            <CrearBoton nombre="Marca" pag={"/nuevaMarca"} />
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={query}
                onChange={cambiarSwich}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
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
              {marcas.map((marca) => {
                return (
                  <TablaMarcas
                    setConsulta={setConsulta}
                    marca={marca}
                    key={marca._id}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}
