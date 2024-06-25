import './App.css';

import {useEffect, useRef, useState} from "react"

function App() {

  const[valorCambio, setValorCambio]=useState(null)

  const dolarRef=useRef()

  const bolivarRef=useRef()

  const resultadoRefDolar=useRef()

  const resultadoRefBolivar=useRef()


  useEffect(()=>{

      const llamaApiCambio = async() => {

        try{

          const respuestaDolar = await fetch("https://v6.exchangerate-api.com/v6/a13f3b38bb0069391dd82a47/latest/USD")

          const respuestaBolivar = await fetch("https://v6.exchangerate-api.com/v6/a13f3b38bb0069391dd82a47/latest/VES")


          const datosDolar = await respuestaDolar.json()

          const datosBolivar = await respuestaBolivar.json()          

          setValorCambio(datosDolar.conversion_rates.USD)

          setValorCambio(datosBolivar.conversion_rates.USD)


        }catch(error){
          console.error("Error al acceder a la API: ", error);

        }

      }
      
      llamaApiCambio()

    }, 

  )

  const calcular = () => {

    const dolaresValor = parseFloat(dolarRef.current.value)
    
    const bolivaresValor = parseFloat(bolivarRef.current.value)

    const dolares = dolaresValor/valorCambio

    const bolivares = bolivaresValor*valorCambio

    resultadoRefDolar.current.innerHTML = dolares.toFixed(2) + " Bs"

    resultadoRefBolivar.current.innerHTML = bolivares.toFixed(2) + " $"

  }

  return <div>

            <h1>CONVERTIDOR DE MONEDAS</h1><br />

            <h2>Dolar - Bolivar</h2>
            <input className='centrarElementos' type='text' ref={dolarRef}></input><br></br>
            <button className='centrarElementos' onClick={calcular}>Convertir</button><br></br>
            <div className='centrarElementos resultado' ref={resultadoRefDolar}></div><br />

            <h2>Bolivar - Dolar</h2>
            <input className='centrarElementos' type='text' ref={bolivarRef}></input><br></br>
            <button className='centrarElementos' onClick={calcular}>Convertir</button><br></br>
            <div className='centrarElementos resultado' ref={resultadoRefBolivar}></div><br /><br /><br />


            <div className='footer'>
              <footer>Pagina elaborada por leonstudios - Eduardo León 2024</footer>
            </div>



  </div>
}

export default App;
