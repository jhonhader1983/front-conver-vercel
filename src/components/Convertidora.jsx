import React, { useState } from "react";
import "./Convertidora.css";

// URL del backend en Vercel
const API_URL = "https://back-convertidor-vercel.vercel.app/api";

const Convertidora = () => {
  const [categoria, setCategoria] = useState("temperatura");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [resultado, setResultado] = useState(null);

  const unidades = {
    temperatura: ["c", "f", "k"],
    tiempo: ["horas", "dias", "meses", "años"],
    peso: ["gramos", "kilos", "libras"],
    moneda: ["USD", "EUR", "COP", "MXN"],
  };

  const handleConvertir = async () => {
    if (!value || !from || !to) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${categoria}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, from, to }),
      });

      const data = await response.json();
      setResultado(data.resultado);
    } catch (error) {
      console.error("Error en la conversión:", error);
    }
  };

  return (
    <div className="convertidora-container">
      <h2>CONVERTIDORA</h2>

      <div className="input-group">
        <label>Categoría</label>
        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setFrom("");
            setTo("");
            setResultado(null);
          }}
        >
          <option value="temperatura">Temperatura</option>
          <option value="tiempo">Tiempo</option>
          <option value="peso">Peso</option>
          <option value="moneda">Moneda</option>
        </select>
      </div>

      <div className="input-group">
        <label>Valor</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>De</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">--Selecciona--</option>
          {unidades[categoria].map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>A</label>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">--Selecciona--</option>
          {unidades[categoria].map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <button className="btn" onClick={handleConvertir}>
        Convertir
      </button>

      {resultado !== null && (
        <h3 className="resultado">El resultado es {resultado}</h3>
      )}
    </div>
  );
};

export default Convertidora;
