import "./NavBar.css";
import { AiOutlineQuestionCircle, AiOutlineWarning, AiOutlineMessage, AiOutlinePhone } from "react-icons/ai";

export default function NavBar() {
  return (
    <nav>
      <div className="navbar">
        <ul className="nav-option">
          <li >
            <a href="" className="nav-list">
              <AiOutlineQuestionCircle className="icons"/> Precisa de Ayuda?
            </a>
          </li>
          <li>
            <a href="" className="nav-list">
              <AiOutlineWarning className="icons"/> Siniestro
            </a>
          </li>
          <li>
            <a href="" className="nav-list">
              <AiOutlineMessage className="icons"/> Chat-Online
            </a>
          </li>
          <li>
            <a href="" className="nav-list">
              <AiOutlinePhone className="icons"/> Teléfono de Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

