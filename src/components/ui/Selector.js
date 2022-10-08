import React from "react";

export default function Selector({ element }) {
  return <option value={element._id}>{element.nombre}</option>;
}
