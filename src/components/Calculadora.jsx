import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

// URL del backend en Vercel
const API_URL = "https://back-convertidor-vercel.vercel.app/api";

function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        const operacion = e.target.value;

        fetch(`${API_URL}/calculadora/${operacion}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ number1, number2 })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultado(responseData.resultado);
        })
        .catch(err => console.error("Error en la calculadora:", err));
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <input type="text" className="number" onChange={(e)=> setNumber1(e.target.value)}/><br />
                <input type="text" className="number" onChange={(e)=> setNumber2(e.target.value)}/><br />
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit}/>
            </form>
            <Resultado resultado={"El resultado es " + resultado}/>
        </div>
    )
}

export default Calculadora;
