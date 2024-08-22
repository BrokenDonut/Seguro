import "./ModuloBeneficio.css";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function ModuloBeneficio({img,tittle,}) {
  return (
    <div className="containet-bene">
      <div className="cont-bene">
        <img src={img} alt="" className="img-beneficio" />
        <div className="text-bene">
          <h3>{tittle}</h3>
          <div className="content-icons">
            <div className="icons-ubi">
              <FaStar />
              <FaMapMarkerAlt />
            </div>
            <div>
              <p>Uso ilimitado</p>
              <p>Lima y Callao</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
