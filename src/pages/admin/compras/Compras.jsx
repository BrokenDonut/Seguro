import React, { useState, useEffect } from 'react';
import './Compras.css';

export default function Compras() {
    const [compras, setCompras] = useState([]);
    const apiUrlCompras = 'http://localhost:5287/api/Compras';

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await fetch(apiUrlCompras);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCompras(data);
            } catch (error) {
                console.error('Error fetching compras:', error);
            }
        };

        fetchCompras();
    }, [apiUrlCompras]);

    return (
        <div className="compras-container">
            <h1 className="titulo-formCA">Listado de Compras</h1>
            {compras.length > 0 ? (
                <table className="compras-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Monto</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map(compra => (
                            <tr key={compra.id}>
                                <td>{compra.id}</td>
                                <td>{compra.fecha}</td>
                                <td>{compra.proveedor}</td>
                                <td>{compra.monto}</td>
                                <td>{compra.detalle}</td>
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
