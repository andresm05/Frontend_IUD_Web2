import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { obtenerEstados } from "../../services/EstadoService";
import { crearInventario } from "../../services/InventarioService";
import { obtenerMarcas } from "../../services/MarcaService";
import { obtenerTiposEquipos } from "../../services/TipoEquipoService";
import { obtenerUsuarios } from "../../services/UsuarioService";
import Selector from "../ui/Selector";

export default function NuevoInventario() {
  const [consulta, setConsulta] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tipoEquipos, setTipoEquipos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [estados, setEstados] = useState([]);
  const form = useRef(null);
  const nuevoInventario = {};

  useEffect(() => {
    const listUsuarios = async () => {
      try {
        const { data } = await obtenerUsuarios(true);
        setUsuarios(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    const listMarcas = async () => {
      try {
        const { data } = await obtenerMarcas(true);
        setMarcas(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    const listTipoEquipos = async () => {
      try {
        const { data } = await obtenerTiposEquipos(true);
        setTipoEquipos(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    const listEstados = async () => {
      try {
        const { data } = await obtenerEstados(true);
        setEstados(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    setConsulta(false);
    if (consulta) {
      listUsuarios();
      listMarcas();
      listTipoEquipos();
      listEstados();
    }
  }, [consulta]);

  const enviarForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    fd.forEach((value, key) => {
      console.log(value, key);
      nuevoInventario[key] = value;
    });
    console.log(nuevoInventario);
    const data ={
      serial: nuevoInventario.serial,
      modelo: nuevoInventario.modelo,
      precio: nuevoInventario.precio,
      usuario:{
        _id:nuevoInventario.usuario
      },
      estado:{
        _id:nuevoInventario.estado
      },
      tipoEquipo:{
        _id:nuevoInventario.tipoEquipo
      },
      marca:{
        _id:nuevoInventario.marca
      }
    }
    try {
      await crearInventario(data);
      toast.success("inventario agregado con éxito");
    } catch (error) {
      const { data } = error.response;
      if (data) {
        toast.error(data.msg);
      } else {
        toast.error("Error agregando el inventario");
      }
    }
  };
  return (
    <div>
      <form ref={form} onSubmit={enviarForm}>
        <div>
          <div className="form-group">
            <label htmlFor="serial">Serial</label>
            <input
              name="serial"
              type="text"
              className="form-control w-50"
              placeholder="Digite el serial"
              required
            />
            <label htmlFor="modelo">Modelo</label>
            <input
              name="modelo"
              type="text"
              className="form-control w-50"
              placeholder="modelo"
              required
            />
            <label htmlFor="precio">Precio</label>
            <input
              name="precio"
              type="number"
              className="form-control w-50"
              placeholder="Valor"
              required
            />
          </div>
          <label htmlFor="usuario">Usuario</label>
          <select
            className="form-select form-select-sm w-50"
            id="usuario"
            name="usuario"
          >
            {usuarios.map((usuario) => {
              return <Selector element={usuario} />;
            })}
          </select>
          <label htmlFor="tipoEquipo">Tipo De Equipo</label>
          <select
            className="form-select form-select-sm w-50"
            id="tipoEquipo"
            name="tipoEquipo"
          >
            {tipoEquipos.map((tipoEquipo) => {
              return <Selector element={tipoEquipo} />;
            })}
          </select>
          <label htmlFor="marca">Marca</label>
          <select
            className="form-select form-select-sm w-50"
            id="marca"
            name="marca"
          >
            {marcas.map((marca) => {
              return <Selector element={marca} />;
            })}
          </select>
          <label htmlFor="estado">Estado</label>
          <select
            className="form-select form-select-sm w-50"
            id="estado"
            name="estado"
          >
            {estados.map((estado) => {
              return <Selector element={estado} />;
            })}
          </select>
          <button type="submit" className="btn btn-primary m-1">
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}
