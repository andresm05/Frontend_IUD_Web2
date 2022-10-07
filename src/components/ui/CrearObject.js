import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CrearObject({ nombre, crear, setConsulta }) {
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
      toast.success("Tipo de Equipo agregado con éxito");
      setConsulta(true);
    } catch (error) {
      const { data } = error.response;
      if (data) {
        toast.error(data.msg);
      } else {
        toast.error("Error Agregando el Tipo de Equipo");
      }
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Nuevo {nombre}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form ref={form} onSubmit={enviarForm}>
              <div className="mb-3">
                <label for="recipient-name" className="col-form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                Enviar
              </button>
            </form>
            <ToastContainer position="bottom-center" autoClose={5000} />
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
