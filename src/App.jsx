import { useState } from 'react'
import './App.css'
import Calculadora from './components/Calculadora'
import Convertidora from './components/Convertidora'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Calculadora />
      <Convertidora />
    </div>
  )
}

export default App
