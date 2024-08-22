import "./ModuloPoliza.css";

export default function ModuloPoliza({
  nombre,
  descripcion,
  precio,
  feIni,
  feFin,
  isSelected,
  onCheckboxChange,
}) {
  return (
    <div className="container-poliza">
      <div className="poliza-cont">
        <input
          type="checkbox"
          className="checked-poliza"
          checked={isSelected}
          onChange={onCheckboxChange}
        />
        <div className="cont-text-poliza">
          <h1 className="tittle-poliza">{nombre}</h1>
          <h3 className="descripcion-poliza">{descripcion}</h3>
        </div>
        <div className="info-poliza">
          <h1 className="precio-poliza">S/ {precio}</h1>
          <p className="fecha-cotizar">{feIni}</p>
          <p className="fecha-cotizar">{feFin}</p>
        </div>
      </div>
    </div>
  );
}
