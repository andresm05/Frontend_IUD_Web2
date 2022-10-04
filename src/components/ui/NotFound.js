import React from "react";
import notFound from "./notFound.jpg";

export default function NotFound() {
  return (
    <div>
      <h1>Pagina no encontrada</h1>
      <img
        src={notFound}
        className="figure img img-fluid d-block"
        alt="404 Error"
      />
    </div>
  );
}
