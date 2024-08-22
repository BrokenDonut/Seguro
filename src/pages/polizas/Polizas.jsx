import { useEffect, useState } from "react";
import "./Polizas.css";
import ModuloPoliza from "./moduloPoliza/ModuloPoliza";
import { FaCar } from "react-icons/fa";

export default function Polizas() {
  const apiUrlTipoSeguro = "http://localhost:5287/api/TipoSeguroes";
  const [state, setState] = useState({
    tipoSeguros: [],
  });
  const [coberturaSeleccionada, setCoberturaSeleccionada] = useState("Media");
  const [selectedId, setSelectedId] = useState(null);
  const [precioPagar, setPrecioPagar] = useState(0);

  useEffect(() => {
    function getTipoSeguro() {
      fetch(apiUrlTipoSeguro)
        .then((resp) => resp.json())
        .then((data) => {
          setState({ ...state, tipoSeguros: data });
        });
    }
    getTipoSeguro();
  }, []);

  const handleCoberturaChange = (event) => {
    setCoberturaSeleccionada(event.target.value);
  };

  const handleCheckboxChange = (id, precio) => {
    setSelectedId(id);
    setPrecioPagar(precio); // Update the price when the checkbox is selected
  };

  const tipoSegurosFiltrados = state.tipoSeguros.filter(
    (tipoSeguro) => tipoSeguro.cobertura === coberturaSeleccionada
  );

  return (
    <div className="body-poliza">
      <img src="/src/assets/lateral-izquierdo.svg" alt="" />
      <div className="separacion-containt">
        <div className="cont-info-car-user">
          <h1>
            Ronaldo Chulluncuy<br /> pronto tendrás tu SOAT
          </h1>
          <div className="info-car-front">
            <FaCar className="car-poliza" />
            <div>
              <p className="placa-name">placa</p>
              <p>Cobertura</p>
              <select
                name="select"
                value={coberturaSeleccionada}
                onChange={handleCoberturaChange}
                className="select-cobertura"
              >
                <option value="Baja" className="option-cobertura">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div className="line"></div>
            <div>
              <p>Marca</p>
              <p>Modelo</p>
            </div>
          </div>
        </div>
        <div className="container-modulo-poliza">
          {tipoSegurosFiltrados.map((tipoSeguro) => (
            <ModuloPoliza
              key={tipoSeguro.id}
              nombre={tipoSeguro.nombre}
              descripcion={tipoSeguro.descripcion}
              precio={tipoSeguro.precio}
              feIni={tipoSeguro.fechaInicio}
              feFin={tipoSeguro.fechaFin}
              isSelected={selectedId === tipoSeguro.id}
              onCheckboxChange={() => handleCheckboxChange(tipoSeguro.id, tipoSeguro.precio)}
            />
          ))}
        </div>
        <div className="total-poliza">
          <button className="buton-acceso btn-pagar">Pagar S/ {precioPagar}</button>
        </div>
      </div>
      <img src="/src/assets/lateral-derecho.svg" alt="" />
    </div>
  );
}
