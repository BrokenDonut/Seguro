import "./Beneficios.css";
import ModuloBeneficio from "./moduloBeneficio/ModuloBeneficio";

export default function Beneficios() {
  return (
    <div className="cont-bene">
      <h1>Conoce los beneficios de tu seguro</h1>
      <div className="content-modbene">
        <ModuloBeneficio
          img="/src/assets/medico.jpg"
          tittle="Asistencia médica para ti y tu familia"
        ></ModuloBeneficio>
        <ModuloBeneficio
          img="/src/assets/repsol.jpg"
          tittle="Ahorra en combustible Repsol"
        ></ModuloBeneficio>
        <ModuloBeneficio
          img="/src/assets/baterias.jpg"
          tittle="20% dscto en baterías ETNA"
        ></ModuloBeneficio>
        <ModuloBeneficio
          img="/src/assets/accesorios.webp"
          tittle="Dscto. en accesorios Protemax"
        ></ModuloBeneficio>
      </div>
    </div>
  );
}
