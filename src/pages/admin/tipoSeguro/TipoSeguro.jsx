import React, { useState, useEffect } from "react";
import "./TipoSeguro.css";

export default function TipoSeguro() {
  const [tipoSeguros, setTipoSeguros] = useState([]);
  const [editTipoSeguro, setEditTipoSeguro] = useState(null);
  const [form, setForm] = useState({
    numeroPoliza: "",
    nombre: "",
    descripcion: "",
    cobertura: "Baja", // Valor inicial
    precio: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const apiUrlTipoSeguro = "http://localhost:5287/api/TipoSeguroes";

  useEffect(() => {
    fetchTipoSeguros();
  }, []);

  const fetchTipoSeguros = async () => {
    try {
      const response = await fetch(apiUrlTipoSeguro);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTipoSeguros(data);
    } catch (error) {
      console.error("Error fetching tipoSeguros:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editTipoSeguro ? "PUT" : "POST";
    const url = editTipoSeguro
      ? `${apiUrlTipoSeguro}/${editTipoSeguro.id}`
      : apiUrlTipoSeguro;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchTipoSeguros();
      setForm({
        numeroPoliza: "",
        nombre: "",
        descripcion: "",
        cobertura: "Baja",
        precio: "",
        fechaInicio: "",
        fechaFin: "",
      });
      setEditTipoSeguro(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (tipoSeguro) => {
    setForm(tipoSeguro);
    setEditTipoSeguro(tipoSeguro);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrlTipoSeguro}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchTipoSeguros();
    } catch (error) {
      console.error("Error deleting tipoSeguro:", error);
    }
  };

  const handleCreate = () => {
    setForm({
      numeroPoliza: "",
      nombre: "",
      descripcion: "",
      cobertura: "Baja",
      precio: "",
      fechaInicio: "",
      fechaFin: "",
    });
    setEditTipoSeguro(null); // Switch to registration mode
  };

  return (
    <div className="tipoSeguro-container">
      <h1 className="titulo-formCA">Listado de Tipos de Seguro</h1>
      <div className="form-CA">
        <button className="btn-crear" onClick={handleCreate}>
          Crear
        </button>
        <div className="container-CA">
          <form onSubmit={handleSubmit} className="">
            <h2>{editTipoSeguro ? "Editar" : "Agregar"} Tipo de Seguro</h2>
            <div className="input-align">
              <input
                type="text"
                name="numeroPoliza"
                value={form.numeroPoliza}
                onChange={handleChange}
                placeholder="Número de Póliza"
                className="input-deco"
                required
              />
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="input-deco"
                required
              />
              <input
                type="text"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                className="input-deco"
                required
              />
              <select
                name="cobertura"
                value={form.cobertura}
                onChange={handleChange}
                className="input-deco"
                required
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div className="input-align">
              <input
                type="text"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="Precio"
                className="input-deco"
                required
              />
              <input
                type="date"
                name="fechaInicio"
                value={form.fechaInicio}
                onChange={handleChange}
                placeholder="Fecha Inicio"
                className="input-deco"
                required
              />
              <input
                type="date"
                name="fechaFin"
                value={form.fechaFin}
                onChange={handleChange}
                placeholder="Fecha Fin"
                className="input-deco"
                required
              />
            </div>

            <button type="submit" className="btn-creaActu">
              {editTipoSeguro ? "Actualizar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>

      {tipoSeguros.length > 0 ? (
        <table className="tipoSeguro-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número de Póliza</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cobertura</th>
              <th>Precio</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipoSeguros.map((tipoSeguro) => (
              <tr key={tipoSeguro.id}>
                <td>{tipoSeguro.id}</td>
                <td>{tipoSeguro.numeroPoliza}</td>
                <td>{tipoSeguro.nombre}</td>
                <td>{tipoSeguro.descripcion}</td>
                <td>{tipoSeguro.cobertura}</td>
                <td>{tipoSeguro.precio}</td>
                <td>{tipoSeguro.fechaInicio}</td>
                <td>{tipoSeguro.fechaFin}</td>
                <td>
                  <button
                    onClick={() => handleEdit(tipoSeguro)}
                    className="btn-actu"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(tipoSeguro.id)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay tipos de seguro para mostrar.</p>
      )}
    </div>
  );
}
