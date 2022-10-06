import { Dialog } from "@mui/material";
import React from "react";

export default function ModalEliminar({
  mostrarAd,
  setMostrarAd,
  objeto,
  eliminar,
}) {
  return (
    <Dialog open={mostrarAd}>
      <div className="bg-secondary p-5">
      <h2 className="text-white text-center p-2">¿Seguro que deseas eliminar este {objeto}?</h2>
      <div className="d-flex flex-row justify-content-around">
        <button
          type="button"
          className="btn btn-outline-info p-4 w-100"
          onClick={() => eliminar()}
        >
          Si
        </button>
        <button
          type="button"
          className="btn btn-outline-info p-4 w-100"
          onClick={() => setMostrarAd(false)}
        >
          No
        </button>
      </div>
      </div>
    </Dialog>
  );
}
