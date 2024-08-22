import "./Obtencion.css";

export default function Obtencion() {
  return (
    <div className="container-obtencion">
      <div>
        <div className="tittle-obtencion">
          <h1>Obtén tu Seguro Vehicular en minutos</h1>
          <p>Circular protegido en tu auto nunca había sido tan fácil.</p>
        </div>
        <div className="cont-points">
          <div className="point-cont">
            <div className="circle-point">
              <p>1</p>
            </div>
            <div className="point-text">
              <h2>Realiza la compra</h2>
              <p>
                100% online o por el canal que prefieras selecciona el seguro
                <br></br> para automóviles que más te convenga según tus
                necesidades.
              </p>
            </div>
          </div>
          <div className="point-cont">
            <div className="circle-point">
              <p>2</p>
            </div>
            <div className="point-text">
              <h2>Inspecciona tu vehículo</h2>
              <p>
                Descarga la app RIMAC, y completar la inspección de tu vehículo,
                <br></br> solo debes tomar algunas fotos.
              </p>
            </div>
          </div>
          <div className="point-cont">
            <div className="circle-point">
              <p>3</p>
            </div>
            <div className="point-text">
              <h2>Maneja tranquilo</h2>
              <p>
                ¡Listo! una vez quede aprobada la inspección tendrás activadas
                las<br></br> coberturas ante todo riesgo.
              </p>
            </div>
          </div>
        </div>
      </div>
      <img src="/src/assets/celular.webp" alt="" />
    </div>
  );
}
