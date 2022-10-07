import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { obtenerUsuarios } from "../../services/UsuarioService";
import ReactLoading from "react-loading";
import CrearBoton from "../ui/CrearBoton";
import TablaUsuarios from "./TablaUsuarios";
import { ToastContainer } from "react-toastify";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [consulta, setConsulta] = useState(true);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);

  const cambiarSwich = () => {
    setConsulta(true);
    setQuery(!query);
  };

  useEffect(() => {
    const listUsuarios = async () => {
      try {
        const { data } = await obtenerUsuarios(query);
        setUsuarios(data);
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
      listUsuarios();
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
        <div>
          <ReactLoading
            type="bubbles"
            color="yellow"
            height={"20%"}
            width={"20%"}
          />
        </div>
      ) : (
        <div>
          <div className="d-flex flex-row justify-content-between">
            <CrearBoton nombre="Usuario" pag={"/nuevoUsuario"} />
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
                <th scope="col">Email</th>
                <th scope="col">Creado</th>
                <th scope="col">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => {
                return (
                  <TablaUsuarios
                    setConsulta={setConsulta}
                    usuario={usuario}
                    setLoading={setLoading}
                    key={usuario._id}
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
