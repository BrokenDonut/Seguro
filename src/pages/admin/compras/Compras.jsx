import React, { useState, useEffect } from 'react';
import './Compras.css';

export default function Compras() {
    const [compras, setCompras] = useState([]);
    const [tipoSeguros, setTipoSeguros] = useState([]);
    const apiUrlCompras = 'http://localhost:5287/api/Compras';
    const apiUrlTipoSeguro = 'http://localhost:5287/api/TipoSeguroes';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener las compras
                const responseCompras = await fetch(apiUrlCompras);
                if (!responseCompras.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataCompras = await responseCompras.json();

                // Obtener los tipos de seguro
                const responseTipoSeguro = await fetch(apiUrlTipoSeguro);
                if (!responseTipoSeguro.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataTipoSeguro = await responseTipoSeguro.json();

                // Guardar datos en el estado
                setCompras(dataCompras);
                setTipoSeguros(dataTipoSeguro);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrlCompras, apiUrlTipoSeguro]);

    // Función para obtener el precio del seguro basado en TipoSeguroId
    const obtenerPrecioSeguro = (tipoSeguroId) => {
        const seguro = tipoSeguros.find((seguro) => seguro.id === tipoSeguroId);
        return seguro ? seguro.precio : 'N/A';
    };

    return (
        <div className="compras-container">
            <h1 className="titulo-formCA">Listado de Compras</h1>
            {compras.length > 0 ? (
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
                        {compras.map(compra => (
                            <tr key={compra.id}>
                                <td>{compra.id}</td>
                                <td>{compra.fechaCompra}</td>
                                <td>{compra.autoId}</td>
                                <td>{compra.tipoSeguroId}</td>
                                <td>{obtenerPrecioSeguro(compra.tipoSeguroId)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay compras para mostrar.</p>
            )}
        </div>
    );
}
