import React, { useState, useEffect } from 'react';
import './Persona.css';

export default function Persona() {
    const [personas, setPersonas] = useState([]);
    const apiUrlPersona = 'http://localhost:5287/api/Personas';

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await fetch(apiUrlPersona);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPersonas(data);
            } catch (error) {
                console.error('Error fetching personas:', error);
            }
        };

        fetchPersonas();
    }, [apiUrlPersona]);

    return (
        <div className="persona-container">
            <h1 className="titulo-formCA">Listado de Personas</h1>
            {personas.length > 0 ? (
                <table className="persona-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map(persona => (
                            <tr key={persona.id}>
                                <td>{persona.id}</td>
                                <td>{persona.nombre}</td>
                                <td>{persona.apellido}</td>
                                <td>{persona.fechaNacimiento}</td>
                                <td>{persona.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay personas para mostrar.</p>
            )}
        </div>
    );
}
