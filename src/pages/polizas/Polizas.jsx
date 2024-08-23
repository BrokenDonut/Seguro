import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Polizas.css";
import ModuloPoliza from "./moduloPoliza/ModuloPoliza";
import { FaCar } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";

export default function Polizas() {
  const { id } = useParams();
  const apiUrlTipoSeguro = "http://localhost:5287/api/TipoSeguroes";
  const apiUrlAuto = `http://localhost:5287/api/Autoes/${id}`;
  const apiUrlPersonas = "http://localhost:5287/api/Personas";
  const apiUrlCompras = "http://localhost:5287/api/Compras";
  const [persona, setPersona] = useState(null);
  const [state, setState] = useState({
    tipoSeguros: [],
    auto: null,
  });
  const [coberturaSeleccionada, setCoberturaSeleccionada] = useState("Media");
  const [selectedId, setSelectedId] = useState(null);
  const [precioPagar, setPrecioPagar] = useState(0);
  const [mostrarPasarela, setMostrarPasarela] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const autoResponse = await fetch(apiUrlAuto);
        if (!autoResponse.ok) {
          throw new Error(`HTTP error! status: ${autoResponse.status}`);
        }
        const autoData = await autoResponse.json();
        const personaResponse = await fetch(
          `${apiUrlPersonas}/${autoData.personaId}`
        );
        if (!personaResponse.ok) {
          throw new Error(`HTTP error! status: ${personaResponse.status}`);
        }
        const personaData = await personaResponse.json();
        setPersona(personaData);

        const tipoSeguroResponse = await fetch(apiUrlTipoSeguro);
        if (!tipoSeguroResponse.ok) {
          throw new Error(`HTTP error! status: ${tipoSeguroResponse.status}`);
        }
        const tipoSeguroData = await tipoSeguroResponse.json();
        setState((prevState) => ({
          ...prevState,
          auto: autoData,
          tipoSeguros: tipoSeguroData,
        }));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchData();
  }, [apiUrlAuto, apiUrlPersonas, apiUrlTipoSeguro]);

  const handleRegistrarCompra = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (!selectedId || !state.auto) {
      alert(
        "Por favor, selecciona un seguro y asegúrate de que el auto esté cargado."
      );
      return;
    }

    const nuevaCompra = {
      FechaCompra: new Date().toISOString().split("T")[0], // Obtiene la fecha actual en formato YYYY-MM-DD
      AutoId: state.auto.id, // El ID del auto
      TipoSeguroId: selectedId, // El ID del seguro seleccionado
    };

    try {
      const response = await fetch(apiUrlCompras, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCompra),
      });

      if (response.ok) {
        alert("Compra registrada con éxito.");
        // Aquí podrías redirigir al usuario a otra página o realizar alguna otra acción
      } else {
        throw new Error("Error al registrar la compra.");
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Hubo un problema al procesar la compra.");
    }
  };

  const handleCoberturaChange = (event) => {
    setCoberturaSeleccionada(event.target.value);
  };

  const handleCheckboxChange = (id, precio) => {
    setSelectedId(id);
    setPrecioPagar(precio);
  };

  const tipoSegurosFiltrados = state.tipoSeguros.filter(
    (tipoSeguro) => tipoSeguro.cobertura === coberturaSeleccionada
  );

  const auto = state.auto || {};
  const { serie, marca, modelo } = auto;

  const handlePagarClick = () => {
    if (selectedId) {
      setMostrarPasarela(true);
    } else {
      alert(
        "Por favor, selecciona una cobertura antes de continuar con el pago."
      );
    }
  };

  return (
    <div className="body-poliza">
      {mostrarPasarela && (
        <div className="pasarela-pago">
          <div className="conteiner-pago">
            <div className="pasarela-text">
              <h1>Pasarela de pago</h1>
              <div>
                <FaCcMastercard className="pasarela-icon" />
                <RiVisaFill className="pasarela-icon" />
              </div>
            </div>
            <form onSubmit={handleRegistrarCompra} className="pagar-poliza">
              <div className="form-pago-1">
                <input
                  type="number"
                  placeholder="Número de Tarjeta"
                  className="input-pagar"
                  required
                />
                <input
                  type="text"
                  placeholder="Nombre del Titular"
                  className="input-pagar"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Fecha de Vencimiento"
                  className="input-pagar input-pagar-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Código de Seguridad"
                  className="input-pagar input-pagar-2"
                  required
                />
              </div>
              <button type="submit" className="buton-acceso btn-poliza">
                Pagar
              </button>
            </form>
          </div>
        </div>
      )}
      <img src="/src/assets/lateral-izquierdo.svg" alt="" />
      <div className="separacion-containt">
        <div className="cont-info-car-user">
          <h1>
            {persona ? `${persona.nombre} ${persona.apellido}` : "Cargando..."}
            <br /> pronto tendrás tu SOAT
          </h1>
          <div className="info-car-front">
            <FaCar className="car-poliza" />
            <div>
              <p className="placa-name">{serie ? serie : "Cargando..."}</p>
              <p>Cobertura</p>
              <select
                name="select"
                value={coberturaSeleccionada}
                onChange={handleCoberturaChange}
                className="select-cobertura"
              >
                <option value="Baja" className="option-cobertura">
                  Baja
                </option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div className="line"></div>
            <div>
              <p>{marca ? marca : "Cargando..."}</p>
              <p>{modelo ? modelo : "Cargando..."}</p>
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
              onCheckboxChange={() =>
                handleCheckboxChange(tipoSeguro.id, tipoSeguro.precio)
              }
            />
          ))}
        </div>
        <div className="total-poliza">
          <button className="buton-acceso btn-pagar" onClick={handlePagarClick}>
            Pagar S/ {precioPagar}
          </button>
        </div>
      </div>
      <img src="/src/assets/lateral-derecho.svg" alt="" />
    </div>
  );
}
