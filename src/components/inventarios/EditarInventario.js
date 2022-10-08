import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { obtenerEstados } from "../../services/EstadoService";
import {
  editarInventarioPorID,
  obtenerInventarioPorId,
} from "../../services/InventarioService";
import { obtenerMarcas } from "../../services/MarcaService";
import { obtenerTiposEquipos } from "../../services/TipoEquipoService";
import { obtenerUsuarios } from "../../services/UsuarioService";
import Selector from "../ui/Selector";

export default function EditarInventario() {
  const [inventario, setInventario] = useState([]);
  const [infoInventario, setInfoInventario] = useState({
    serial: inventario.serial,
    modelo: inventario.modelo,
    precio: inventario.precio,
    usuario: inventario.usuario,
    marca: inventario.marca,
    tipoEquipo: inventario.tipoEquipo,
    estado: inventario.estado,
    foto: inventario.foto,
  });
  const location = useLocation();
  console.log(location);
  const idInventario = location.search.slice(1);

  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tiposEquipos, setTipoEquipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [consulta, setConsulta] = useState(true);

  useEffect(() => {
    const consultarInventario = async () => {
      try {
        const { data } = await obtenerInventarioPorId(idInventario);
        setInventario(data);
      } catch (error) {
        console.log(error);
      }
    };
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
      consultarInventario();
      listUsuarios();
      listMarcas();
      listTipoEquipos();
      listEstados();
    }
  }, [consulta, idInventario]);

  const editarInventario = async () => {
    try {
      await editarInventarioPorID(idInventario, infoInventario);
      toast.success("Inventario editado con éxito");
    } catch (e) {
      toast.error(e);
    }
  };
  const getUsuario = () => {
    const opciones = document.getElementById("usuario");
    const seleccion = opciones.options[opciones.selectedIndex].value;
    console.log(seleccion);
    setInfoInventario({ ...infoInventario, usuario: seleccion });
  };

  const getTipoEquipo = () => {
    const opciones = document.getElementById("tipoEquipo");
    const seleccion = opciones.options[opciones.selectedIndex].value;
    console.log(seleccion);
    setInfoInventario({ ...infoInventario, tipoEquipo: seleccion });
  };
  const getMarca = () => {
    const opciones = document.getElementById("marca");
    const seleccion = opciones.options[opciones.selectedIndex].value;
    console.log(seleccion);
    setInfoInventario({ ...infoInventario, marca: seleccion });
  };
  const getEstado = () => {
    const opciones = document.getElementById("estado");
    const seleccion = opciones.options[opciones.selectedIndex].value;
    console.log(seleccion);
    setInfoInventario({ ...infoInventario, estado: seleccion });
  };

  return (
    <div>
      <label>Serial:</label>
      <input
        type="text"
        className="form-control w-50"
        placeholder="Serial"
        defaultValue={inventario.serial}
        onChange={(e) => {
          setInfoInventario({ ...infoInventario, serial: e.target.value });
        }}
      />
      <label>Precio:</label>
      <input
        type="number"
        className="form-control w-50"
        placeholder="Precio"
        defaultValue={inventario.precio}
        onChange={(e) => {
          setInfoInventario({ ...infoInventario, precio: e.target.value });
        }}
      />
      <label>Modelo:</label>
      <input
        type="text"
        className="form-control w-50"
        placeholder="modelo"
        defaultValue={inventario.modelo}
        onChange={(e) => {
          setInfoInventario({ ...infoInventario, modelo: e.target.value });
        }}
      />
      <label>Foto</label>
      <input
        type="url"
        className="form-control w-50"
        placeholder="url"
        defaultValue={inventario.foto}
        onChange={(e) => {
          setInfoInventario({ ...infoInventario, foto: e.target.value });
        }}
      />
      <label>Usuario:</label>
      <select
        className="form-select form-select-sm w-50"
        id="usuario"
        name="usuario"
        onChange={() => getUsuario()}
      >
        {usuarios.map((usuario) => {
          return <Selector element={usuario} />;
        })}
      </select>
      <label>Tipo de Equipo:</label>
      <select
        className="form-select form-select-sm w-50"
        id="tipoEquipo"
        name="tipoEquipo"
        onChange={() => getTipoEquipo()}
      >
        {tiposEquipos.map((tipoEquipo) => {
          return <Selector element={tipoEquipo} />;
        })}
      </select>
      <label>Marca:</label>
      <select
        className="form-select form-select-sm w-50"
        id="marca"
        name="marca"
        onChange={() => getMarca()}
      >
        {marcas.map((marca) => {
          return <Selector element={marca} />;
        })}
      </select>

      <label>Estado:</label>
      <select
        className="form-select form-select-sm w-50"
        id="estado"
        name="estado"
        onChange={() => getEstado()}
      >
        {estados.map((estado) => {
          return <Selector element={estado} />;
        })}
      </select>

      <button
        type="button"
        class="btn btn-outline-primary m-2"
        onClick={() => editarInventario()}
      >
        Enviar
      </button>
      <Link
        to="/inventarios"
        type="button"
        className="btn btn-outline-danger m-2"
      >
        Cancelar
      </Link>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}
