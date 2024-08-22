import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/login/admin");
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container-form-login">
      <div className="login-form">
        <img src="/src/assets/img-login.avif" alt="img" className="login-img" />
        <div className="form-input-login">
          <form onSubmit={handleSubmit} className="form-login">
            <h1>Hola de Nuevo!</h1>
            <p className="form-parrafo">
              Bienvenido, por favor ingresar sus datos
            </p>
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="button-3">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
