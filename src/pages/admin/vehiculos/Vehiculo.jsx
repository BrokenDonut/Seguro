import React, { useState, useEffect } from 'react';
import './Vehiculo.css';

export default function Vehiculo() {
    const [vehiculos, setVehiculos] = useState([]);
    const apiUrlVehiculo = 'http://localhost:5287/api/Autoes';

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const response = await fetch(apiUrlVehiculo);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVehiculos(data);
            } catch (error) {
                console.error('Error fetching vehiculos:', error);
            }
        };

        fetchVehiculos();
    }, [apiUrlVehiculo]);

    return (
        <div className="vehiculo-container">
            <h1 className="titulo-formCA">Listado de Vehículos</h1>
            {vehiculos.length > 0 ? (
                <table className="vehiculo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Placa</th>
                            <th>Persona ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.map(vehiculo => (
                            <tr key={vehiculo.id}>
                                <td>{vehiculo.id}</td>
                                <td>{vehiculo.marca}</td>
                                <td>{vehiculo.modelo}</td>
                                <td>{vehiculo.anio}</td>
                                <td>{vehiculo.serie}</td>
                                <td>{vehiculo.personaId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay vehículos para mostrar.</p>
            )}
        </div>
    );
}
