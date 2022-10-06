import React from 'react'

export default function SeleccionEstado({setInfoObject, infoObject}) {

    const getEstado = () => {
        const opciones = document.getElementById("estado");
        const seleccion = opciones.options[opciones.selectedIndex].value;
        setInfoObject({ ...infoObject, estado: seleccion });
      };

  return (
    <select
    className="custom-select w-100"
    id="estado"
    name="estado"
    onChange={() => getEstado()}
  >
    <option selected disabled>
      Seleccione una opcion
    </option>
    <option value={true}>Activo</option>
    <option value={false}>Inactivo</option>
  </select>
  )
}
