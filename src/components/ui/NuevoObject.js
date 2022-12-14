import React, { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NuevoObject({ crear, nombre, email }) {
  const form = useRef(null);
  const nuevoObject = {};

  const enviarForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    fd.forEach((value, key) => {
      console.log(value, key);
      nuevoObject[key] = value;
    });
    console.log(nuevoObject);
    try {
      await crear(nuevoObject);
      toast.success(`${nombre} agregado con éxito`);
    } catch (error) {
      const { data } = error.response;
      if (data) {
        toast.error(data.msg);
      } else {
        toast.error(`Error agregando el ${nombre}`);
      }
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
              className="form-control w-50"
              placeholder="Digite el nombre"
              required
            />
            {email && (
              <>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control w-50"
                  placeholder="Digite el email"
                  required
                />
              </>
            )}
          </div>
          <button type="submit" className="btn btn-primary m-1">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
