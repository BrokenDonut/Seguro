import { useState } from "react";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cotizar.css";

export default function Cotizar() {
  const [showRegister, setShowRegister] = useState(false);
  const [showAutoForm, setShowAutoForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [placa, setPlaca] = useState("");

  const apiUrlPersona = "http://localhost:5287/api/Personas";
  const apiUrlAuto = "http://localhost:5287/api/Autoes";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dni = e.target.elements.dni.value;
    const placaInput = e.target.elements.placa.value;

    if (dni === "" || placaInput === "") {
      setShowRegister(true);
    } else {
      try {
        const response = await fetch(`${apiUrlAuto}?serie=${placaInput}`);

        if (response.status === 404) {
          alert("Placa no encontrada. Registra tu vehículo.");
          setShowRegister(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Respuesta de la API:", data);

        const matchingVehicle = data.find(
          (vehicle) => vehicle.serie === placaInput
        );

        if (matchingVehicle) {
          const autoId = matchingVehicle.id;
          navigate(`/${autoId}/poliza`);
        } else {
          setShowRegister(true);
        }
      } catch (error) {
        console.error("Error al verificar la placa:", error);
        alert("Ocurrió un error al verificar la placa. Intenta nuevamente.");
        setShowRegister(true);
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !fechaNacimiento || !correo) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch(apiUrlPersona, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          fechaNacimiento,
          email: correo,
        }),
      });

      if (response.ok) {
        alert("Persona registrada con éxito");
        setShowAutoForm(true);
      } else {
        alert("Error al registrar la persona");
      }
    } catch (error) {
      console.error("Error al registrar la persona:", error);
      alert("Error al registrar la persona");
    }
  };

  const handleAutoSubmit = async (e) => {
    e.preventDefault();

    try {
      const personaResponse = await fetch(`${apiUrlPersona}?email=${correo}`);
      if (!personaResponse.ok) {
        throw new Error(`HTTP error! status: ${personaResponse.status}`);
      }
      
      const personaData = await personaResponse.json();
      
      if (Array.isArray(personaData) && personaData.length > 0) {
        const personaId = personaData[0].id;
        
        const response = await fetch(apiUrlAuto, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            marca,
            modelo,
            anio,
            serie: placa,
            personaId: personaId,
          }),
        });

        if (response.ok) {
          alert("Vehículo registrado con éxito");
        } else {
          alert("Error al registrar el vehículo");
        }
      } else {
        alert("Persona no encontrada con el correo proporcionado");
      }
    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
      alert("Error al registrar el vehículo");
    }
  };


  return (
    <div className="container-cotizar">
      <img src="/src/assets/bolante.avif" alt="" />
      <div className="cotizar-text">
        <p className="cotizar-parrafo1">Asegura tu vehiculo</p>
        <h1>
          Protegemos tu auto desde
          <br /> el primer dia
        </h1>
        <form className="form-cotizar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="DNI"
            className="input-cotizar"
            id="dni"
          />
          <input
            type="text"
            placeholder="Placa"
            className="input-cotizar"
            id="placa"
          />
          <label>Tipo de Vehiculo</label>
          <p className="cotizar-parrafo2 parrafo-line">
            Al continuar acepto la <a href="#">Politicas de privacidad</a>
          </p>
          <div className="container-check">
            <input type="checkbox" required />
            <label className="cotizar-parrafo2">
              Acepto la Política para el uso y tratamiento de datos personales
              para Promociones Comerciales y otros fines
            </label>
          </div>
          <button className="buton-acceso btn-cotizar" type="submit">
            Cotizar
          </button>
        </form>

        {showRegister && (
          <div className="container-registrer" style={{ display: "flex" }}>
            <div className="registrar-car">
              <a href="#" onClick={() => setShowRegister(false)}>
                Cerrar X
              </a>
              <div className="containt-form-register">
                <FaCar className="car-icon" />
                <h1>Sobre tu vehículo</h1>
                <p className="form-parrafo-register">Registra tus Datos</p>
                <form
                  onSubmit={handleRegisterSubmit}
                  className="form-register-placa"
                >
                  <div className="form-register">
                    <div className="input-register">
                      <label>Nombre</label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="input-register">
                      <label>Apellido</label>
                      <input
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </div>
                    <div className="input-register">
                      <label>Fecha Nacimiento</label>
                      <input
                        type="date"
                        placeholder="Fecha Nacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-register input-serie">
                    <label>Correo</label>
                    <input
                      type="email"
                      placeholder="Ingrese su Correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                  <div className="containt-btn">
                    <button type="submit" className="buton-acceso btn-save">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="buton-acceso btn-save"
                      onClick={() => {
                        setShowAutoForm(true);
                        setShowRegister(false);
                      }}
                    >
                      Registrar Vehículo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showAutoForm && (
          <div className="container-registrer" style={{ display: "flex" }}>
            <div className="registrar-car">
              <a href="#" onClick={() => setShowAutoForm(false)}>
                Cerrar X
              </a>
              <div className="containt-form-register">
                <FaCar className="car-icon" />
                <h1>Datos del Vehículo</h1>
                <form
                  onSubmit={handleAutoSubmit}
                  className="form-register-placa"
                >
                  <div className="input-register input-serie">
                    <label>Correo</label>
                    <input
                      type="email"
                      placeholder="Ingrese su Correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                  <div className="form-register">
                    <div className="input-register">
                      <label>Marca</label>
                      <input
                        type="text"
                        placeholder="Marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                      />
                    </div>
                    <div className="input-register">
                      <label>Modelo</label>
                      <input
                        type="text"
                        placeholder="Modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                      />
                    </div>
                    <div className="input-register">
                      <label>Año</label>
                      <input
                        type="number"
                        placeholder="Año"
                        value={anio}
                        onChange={(e) => setAnio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-register input-serie">
                    <label>Placa</label>
                    <input
                      type="text"
                      placeholder="Placa"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value)}
                    />
                  </div>
                  <div className="containt-btn">
                    <button type="submit" className="buton-acceso btn-save">
                      Guardar Vehículo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
