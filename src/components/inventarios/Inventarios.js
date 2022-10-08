import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { obtenerInventarios } from "../../services/InventarioService";
import CrearBoton from "../ui/CrearBoton";
import CardInventarios from "./CardInventarios";

export default function Inventarios() {
  const [inventarios, setInventarios] = useState([]);
  const [consulta, setConsulta] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const listInventarios = async () => {
      try {
        const { data } = await obtenerInventarios();
        setInventarios(data);
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
      listInventarios();
    }
  }, [consulta]);
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
        <div className="d-flex flex-column">
          <CrearBoton
            nombre="Inventario"
            pag={"/nuevoInventario"}
            className="m-5"
          />
          <div className="d-flex flex-wrap justify-content-between">
            {inventarios.map((inventario) => {
              return (
                <CardInventarios
                  inventario={inventario}
                  key={inventario._id}
                  setConsulta={setConsulta}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
