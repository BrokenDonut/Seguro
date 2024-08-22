import ModuloProteccion from "./moduloProteccion/ModuloProteccion";
import "./Proteccion.css";

export default function Proteccion() {
  return (
    <div className="container-proteccion">
      <div>
        <h1>Te Protegemos en todo momento</h1>
        <p>
          Todos los planes de nuestro seguro vehicular cuentan con cobertura
          ante todo riesgo.
        </p>
      </div>
      <div className="group-modulo">
        <ModuloProteccion
          img="/src/assets/alarma.svg"
          tittle="En caso de accidente"
          description="Si tu auto se avería, cuentas con más de 5 asistencias viales para solucionarlo."
        ></ModuloProteccion>
        <ModuloProteccion
          img="/src/assets/choque.svg"
          tittle="En caso de emergencia vial"
          description="Cubriremos los gastos ya sea por responsabilidad a terceros o por daños a tu auto."
        ></ModuloProteccion>
        <ModuloProteccion
          img="/src/assets/accidente.svg"
          tittle="En caso de pérdida total"
          description="Ya sea por robo o perdida por accidente, cubriremos el valor comercial de tu auto."
        ></ModuloProteccion>
      </div>
    </div>
  );
}
