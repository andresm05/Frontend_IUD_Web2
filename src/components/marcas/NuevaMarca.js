import React from "react";
import { ToastContainer } from "react-toastify";
import { crearMarca } from "../../services/MarcaService";
import NuevoObject from "../ui/NuevoObject";

export default function NuevaMarca() {
  return (
    <div>
      <NuevoObject crear={crearMarca} nombre={"Marca"} email={false} />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}
