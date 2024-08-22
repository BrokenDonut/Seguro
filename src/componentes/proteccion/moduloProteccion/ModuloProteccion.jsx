import "./ModuloProteccion.css";

export default function ModuloProteccion({tittle,description,img}) {
  return (
    <div className="vineta-prote">
      <div className="modulo-container">
        <img src={img} alt="" />
        <h3>{tittle}</h3>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
}
