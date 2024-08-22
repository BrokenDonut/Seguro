import Beneficios from "../../componentes/beneficios/Beneficios";
import Contact from "../../componentes/contact/Contac";
import Cotizar from "../../componentes/cotizar/Cotizar";
import Obtencion from "../../componentes/obtecion/Obtencion";
import Proteccion from "../../componentes/proteccion/Proteccion";

export default function Home() {
  return (
    <div>
      <Cotizar></Cotizar>
      <Proteccion></Proteccion>
      <Obtencion></Obtencion>
      <Beneficios></Beneficios>
      <Contact></Contact>
    </div>
  );
}
