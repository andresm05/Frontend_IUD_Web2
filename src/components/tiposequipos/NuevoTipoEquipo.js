import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { crearTipoEquipo } from "../../services/TipoEquipoService";

export default function NuevoTipoEquipo() {
  const form = useRef(null);
  const nuevoTipoDeEquipo = {};

  const enviarForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    fd.forEach((value, key) => {
      console.log(value, key);
      nuevoTipoDeEquipo[key] = value;
    });
    console.log(nuevoTipoDeEquipo)
    try{
      await crearTipoEquipo(nuevoTipoDeEquipo)
      toast.success("Tipo de Equipo agregado con éxito")  
    }catch(error){
      toast.error("Error Agregando el Tipo de Equipo")
    }
  
  };

  return (
    <div>
      <form ref={form} onSubmit={enviarForm}>
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              name="nombre"
              type="text"
              className="form-control"
              placeholder="Digite el nombre"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary m-1">
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}
