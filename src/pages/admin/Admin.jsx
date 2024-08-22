import React, { useState } from "react";
import "./Admin.css";
import Compras from "./compras/Compras";
import Persona from "./persona/Persona";
import TipoSeguro from "./tipoSeguro/TipoSeguro";
import Vehiculo from "./vehiculos/Vehiculo";

export default function Admin() {
  const [selectedTable, setSelectedTable] = useState("Persona");

  const handleOptionClick = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <div className="containt-slidebar">
      <div className="slidebar">
        <div className="slidebar-cont">
          <h2>Contenido</h2>
        </div>
        <div className="slidebar-option">
          <a href="#" onClick={() => handleOptionClick("Vehiculo")}>
            Vehículos
          </a>
          <a href="#" onClick={() => handleOptionClick("Persona")}>
            Personas
          </a>
          <a href="#" onClick={() => handleOptionClick("TipoSeguro")}>
            Polizas
          </a>
          <a href="#" onClick={() => handleOptionClick("Compras")}>
            Compras
          </a>
        </div>
      </div>
      <div className="table-container">
        <div className="compt-data">
          {selectedTable === "Persona" && <Persona />}
          {selectedTable === "TipoSeguro" && <TipoSeguro />}
          {selectedTable === "Vehiculo" && <Vehiculo />}
          {selectedTable === "Compras" && <Compras />}
        </div>
      </div>
    </div>
  );
}
