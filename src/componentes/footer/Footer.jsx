import './Footer.css'
import { FaLocationDot } from "react-icons/fa6";

export default function Footer(){
    return(
        <div className='container-footer'>
            <img src="/src/assets/logo-seguros.png" alt="" />
            <p> <FaLocationDot />Av Pedro Miotta 950, San Juan de Miraflores 15801</p>
            <p>Hecho por:<br></br>* Ronaldo Chulluncuy<br></br>* Rany Perez</p>
        </div>
    );
}