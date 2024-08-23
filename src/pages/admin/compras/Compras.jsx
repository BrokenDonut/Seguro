import React, { useState, useEffect } from "react";
import "./Compras.css";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function Compras() {
  const [compras, setCompras] = useState([]);
  const [tipoSeguros, setTipoSeguros] = useState([]);
  const apiUrlCompras = "http://localhost:5287/api/Compras";
  const apiUrlTipoSeguro = "http://localhost:5287/api/TipoSeguroes";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCompras = await fetch(apiUrlCompras);
        if (!responseCompras.ok) {
          throw new Error("Network response was not ok");
        }
        const dataCompras = await responseCompras.json();

        const responseTipoSeguro = await fetch(apiUrlTipoSeguro);
        if (!responseTipoSeguro.ok) {
          throw new Error("Network response was not ok");
        }
        const dataTipoSeguro = await responseTipoSeguro.json();

        setCompras(dataCompras);
        setTipoSeguros(dataTipoSeguro);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrlCompras, apiUrlTipoSeguro]);

  const obtenerPrecioSeguro = (tipoSeguroId) => {
    const seguro = tipoSeguros.find((seguro) => seguro.id === tipoSeguroId);
    return seguro ? parseFloat(seguro.precio) : 0;
  };

  const obtenerCobertura = (tipoSeguroId) => {
    const seguro = tipoSeguros.find((seguro) => seguro.id === tipoSeguroId);
    return seguro ? seguro.cobertura : "Desconocida";
  };

  const contarCobertura = () => {
    const conteo = { Baja: 0, Media: 0, Alta: 0 };

    compras.forEach((compra) => {
      const cobertura = obtenerCobertura(compra.tipoSeguroId);
      if (conteo[cobertura] !== undefined) {
        conteo[cobertura]++;
      }
    });

    return [
      { cobertura: "Baja", cantidad: conteo.Baja },
      { cobertura: "Media", cantidad: conteo.Media },
      { cobertura: "Alta", cantidad: conteo.Alta },
    ];
  };

  const calcularTotalPrecio = () => {
    return compras.reduce((total, compra) => {
      return total + obtenerPrecioSeguro(compra.tipoSeguroId);
    }, 0);
  };

  const dataCobertura = contarCobertura();
  const totalPrecio = calcularTotalPrecio().toFixed(2);

  return (
    <div className="compras-container">
      <h1 className="titulo-formCA">Listado de Compras</h1>
      {compras.length > 0 ? (
        <>
          <table className="compras-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Compra</th>
                <th>ID del Auto</th>
                <th>ID del Seguro</th>
                <th>Precio de Póliza</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.id}</td>
                  <td>{compra.fechaCompra}</td>
                  <td>{compra.autoId}</td>
                  <td>{compra.tipoSeguroId}</td>
                  <td>{obtenerPrecioSeguro(compra.tipoSeguroId).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="barras-data">Resumen de Cobertura</h2>
          <BarChart width={500} height={300} data={dataCobertura}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cobertura" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
          <div className="mostrar-precio">
            <h2>Total de Precios de Pólizas</h2>
            <h1>S/ {totalPrecio}</h1>
          </div>
        </>
      ) : (
        <p>No hay compras para mostrar.</p>
      )}
    </div>
  );
}
