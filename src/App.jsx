import { useState, useEffect } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import { formatearDinero, calcularTotal } from './utils'

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(3);
  const [total, setTotal] = useState(calcularTotal(0));
  const [pago, setPago] = useState(0);

  useEffect(() => {
    const resultadoTotalPagar = calcularTotal(cantidad, meses)
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses])

  useEffect(() => {
    // Calcular el pago mensual
    const pagoMensual = total / meses
    setPago(pagoMensual)
  }, [total])

  const min = 0;
  const max = 20000;
  const step = 100

  function handleChange(e) {
    setCantidad(+e.target.value)
  }

  function handleClickDecremento() {
    const valor = cantidad - step;
    if(valor < min) {
      alert('No se puede disminuir el monto')
      return;
    }
    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor = cantidad + step;
    if(valor > max) {
      alert('No se puede aumentar el monto')
      return;
    }
    setCantidad(valor);
  }
  return (
    <div className='my-6 max-w-lg mx-auto bg-white p-10 shadow'>
      <Header />

      <div className='flex justify-between my-14'>
        <Button 
          operador={'-'}
          fn={handleClickDecremento}
        />
        <Button 
          operador={'+'}
          fn={handleClickIncremento}
        />
      </div>

      <input
        type="range"
        className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {formatearDinero(cantidad)}
      </p>
      <h2 className='text-center text-2xl font-bold text-gray-500'>
        Elige un <span className='text-indigo-600'>plazo</span> a pagar
      </h2>
      <select className='mt-5 text-center w-full p-2 rounded-lg bg-white border border-gray-500 text-gray-500 font-bold'
      value={meses}
      onChange={(e) => setMeses(+e.target.value)}
      >
        <option value="">Selecciona un plazo</option>
        <option value="3">3 meses</option>
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-50 p-5'>
      <h2 className='text-center text-2xl font-bold text-gray-500'>
        Tu resumen de<span className='text-indigo-600'> pagos</span>
      </h2>
      <p className='text-xl text-gray-500 text-center font-bold'>{meses} meses</p>
      <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
      <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} mensuales</p>
      </div>
    </div>
  )
}

export default App